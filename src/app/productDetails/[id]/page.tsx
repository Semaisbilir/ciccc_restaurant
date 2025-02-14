"use client";
import { useEffect, useState } from "react";
import client from "../../lib/contentful";
import "./productDetails.css";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Button from "@/app/components/Button/Button";
import Section from "@/app/components/Section/Section";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic";

const DetailsPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [item, setItem] = useState<any | null>(null);
    const { addToCart } = useCart();
    const { isSignedIn } = useUser();

    const fetchProduct = async (id: string) => {
        try {
            const entries = await client.getEntries({
                content_type: process.env.NEXT_PUBLIC_CONTENTFUL_MODEL_ID || "",
                "sys.id": id,
            });
            return entries.items[0]; // Return the first item from the entries
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct(id as string).then((productData) => {
                setItem(productData || null); // Store the product in state
            });
        }
    }, [id]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        if (isSignedIn) {
            addToCart(item);
        } else {
            router.push("/login"); // Redirect to login page if not signed in
        }
    };

    if (!item) {
        return <div>Loading product details...</div>;
    }

    const { name, desc, price, photo } = item.fields;
    const imageUrl = photo?.fields?.file?.url;
    const fullImageUrl = imageUrl ? `https:${imageUrl}` : "";

    return (
        <>
            <Section>
                <div className="productDetails-container">
                    <div className="product-details">
                        <h1 className="productDetails-title">{name}</h1>

                        <div className="product-detail-image">
                            {fullImageUrl && (
                                <Image
                                    src={fullImageUrl}
                                    alt={name}
                                    width={500}
                                    height={500}
                                    className="product-detail-image"
                                />
                            )}
                        </div>
                        <p className="productDetails-price">${price}</p>
                    </div>

                    <div className="productDetails-content">
                        <div className="product-detail-info">
                            <div className="product-description">{documentToReactComponents(desc)}</div>

                            <Button
                                text="Add to Cart"
                                classname="button-secondary button-secondary-sm"
                                onClick={handleAddToCart}
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default DetailsPage;
