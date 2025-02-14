"use client";
    
import client from "../../lib/contentful";
import "./Landing.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import MenuList from "../MenuList/MenuList";
import Section from "../Section/Section";
import { useState, useEffect } from "react";

export default function Landing() {
    const [featuredItems, setFeaturedItems] = useState<any[]>([]);
    
    useEffect(() => {
        fetchFeaturedItems().then(items => setFeaturedItems(items));
    }, []);

    const router = useRouter();

    const handleViewMenu = () => {
        router.push("/menu");
    }

    const fetchFeaturedItems = async () => {
        try {
            const response = await client.getEntries({
                content_type: process.env.NEXT_PUBLIC_CONTENTFUL_MODEL_ID || '',
                "fields.featured": true,
                limit: 5,
            });
            return response.items;
        } catch (error) {
            console.error("Error fetching featured items", error);
            return [];
        }
    };

    return (
        <div className="landing">
            <Section>
                <div className="landing-content">
                    <h1 className="landing-title">Best food for your taste</h1>
                    <p className="landing-subtitle">Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</p>
                    <Button classname="button-secondary" text="View Menu" onClick={handleViewMenu} />
                </div>
            </Section>
            <Section>   
                <MenuList items={featuredItems} onViewFullMenu={handleViewMenu}/>
            </Section>
        </div>
    )
}