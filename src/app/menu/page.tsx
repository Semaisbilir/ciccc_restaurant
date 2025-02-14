"use client";
import { useEffect, useState } from "react";
import "./menu.css";
import client from "../lib/contentful";

import { useCart } from "@/app/context/CartContext";
import MenuList from "@/app/components/MenuList/MenuList";
import Section from "@/app/components/Section/Section";
export const dynamic = "force-dynamic";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const { addToCart } = useCart();

    const fetchEntries = async () => {
        try {
            const entries = await client.getEntries({
                content_type: process.env.NEXT_PUBLIC_CONTENTFUL_MODEL_ID || "",
            });
            return entries.items;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        const getEntries = async () => {
            const items = await fetchEntries();
            setMenuItems(items || []);
        };
        getEntries();
    }, []);

    return (
        <>
            <Section className="menu-list-hero">
                <h1 className="menu-title">Our Menu</h1>
                <p className="menu-subtitle">
                    Discover our carefully crafted dishes made with fresh ingredients and served with passion
                </p>
            </Section>
            <Section containerWidth="wide">
                <MenuList items={menuItems} onAddToCart={addToCart} />
            </Section>
        </>
    );
};

export default MenuPage;
