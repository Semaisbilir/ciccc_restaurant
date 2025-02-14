import "./FeaturedItems.css";
import MenuList from "../MenuList/MenuList";
import { useRouter } from "next/router";
export default function FeaturedItems({ items, onAddToCart }: { items: any[], onAddToCart: (item: any) => void }) {
    
    const router = useRouter();

    const seeFullMenu = () => {
        router.push("/menu");
    }

    return (        
        <div className="featured-items">
            <MenuList items={items} onAddToCart={seeFullMenu} />
        </div>
    )
}