import { Facebook, Github, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button/Button";
import img1 from "../../../../public/images/menu/cake.png";
import img2 from "../../../../public/images/menu/eggs.png";
import img3 from "../../../../public/images/menu/pizza.png";
import img4 from "../../../../public/images/menu/wine.png";
import logo from "../../../../public/japanese-food.png";

export function Footer() {
  return (
    <footer className="bg-zinc-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <Image src={logo} alt="Logo" width={100} height={100}/>
              </div>
              <h2 className="text-2xl font-serif italic">Bistro Bliss</h2>
            </div>
            <p className="text-gray-400 text-sm">
              In the new era of technology we look a in the future with
              certainty and pride to for our company and.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <X />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Github />
              </Link>
            </div>
            <div className="mt-4 flex justify-center ">
            <Link href={"/sign-up"}>
              <Button text="Sign Up" classname="button-primary"  />
            </Link>
            </div>
            
          </div>

          {/* Pages Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Pages</h3>
            <ul className="space-y-2">
              {["Home", "Menu", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Utility Pages</h3>
            <ul className="space-y-2">
              {[
                "Start Here",
                "Styleguide",
                "Password Protected",
                "404 Not Found",
                "Licenses",
                "Changelog",
                "View More",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram Feed */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Follow Us On Instagram
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={img1}
                alt="Noodles with egg"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
              <Image
                src={img2}
                alt="French fries"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
              <Image
                src={img3}
                alt="Loaded fries"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
              <Image
                 src={img4}
                alt="Pancakes with berries"
                width={150}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          Copyright © 2025 Hashtag Developer. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
