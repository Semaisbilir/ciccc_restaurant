import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log("**************HERE**************");
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);
  console.log("**************----**************");

  /* TODO: Store user data in your database */

  if (eventType === "user.created" && "email_addresses" in evt.data) {
    const user = {
      clerkId: evt.data.id,
      email: evt.data.email_addresses?.[0]?.email_address || "",
      firstName: evt.data.first_name || "",
      lastName: evt.data.last_name || "",
      photo: evt.data.image_url || "",
    };

    console.dir(user, { depth: null });

    // store it in our database

    try {
      // UPSERT == update or create
      await prisma.user.upsert({
        where: { clerkId: user.clerkId },
        update: user,
        create: user,
      });
      console.log("User stored in database");
    } catch (err: any) {
      return new NextResponse("Error: Could not store user data", err);
    }
  }

  return new Response("Webhook received", { status: 200 });
}
