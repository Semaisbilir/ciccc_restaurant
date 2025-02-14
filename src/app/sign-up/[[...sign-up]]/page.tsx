import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgrounds/Hero.png')" }}
    >
      <SignUp appearance={{ baseTheme: dark }} />
    </div>
  );
}
