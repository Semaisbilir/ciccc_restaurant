import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from "next/image";
import "./MenuList.css";
import Button from '@/app/components/Button/Button';
import { MenuListProps } from '@/types/Menu/Menu';
import { useCart } from '@/app/context/CartContext';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


export default function MenuList({ items, onAddToCart, onViewFullMenu }: MenuListProps) {

  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useCart();

  //Check if user is logged in
  const { isSignedIn } = useUser();
  
  const SeeMyCart = () => {
    router.push('/cart');
  };

  console.log(cartItems.length);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="menu-list">
        {items.map((entry: any) => {
          const { title, desc, price, photo } = entry.fields;
          const imageUrl = photo?.fields?.file?.url;
          const fullImageUrl = imageUrl ? `https:${imageUrl}` : '';

          return (
            <div
              className="menu-item"
              key={entry.sys.id}
            >
              {fullImageUrl && (
                <Image 
                  src={fullImageUrl} 
                  alt={title} 
                  width={500} 
                  height={500}
                  className="menu-item-image"
                /> 
              )}
              <div className="menu-item-info">
                <p className="menu-item-price">${price}</p>
                <h3 className="menu-item-title">{title}</h3>              
                <div className="menu-item-about">
                  {documentToReactComponents(desc)}
                </div>
              </div>
              <div className="menu-item-button">
                {!isSignedIn ? (
                  <Button 
                    text="Sign Up to Order" 
                    classname="button-secondary button-secondary-sm" 
                    onClick={() => router.push('/sign-up')} 
                  />
                ) : onAddToCart ? (
                  <Button 
                    text="Add to Cart" 
                    classname="button-secondary button-secondary-sm" 
                    onClick={() => onAddToCart(entry)} 
                  />
                ) : onViewFullMenu ? (
                  <Button 
                    text="View Full Menu" 
                    classname="button-secondary button-secondary-sm" 
                    onClick={() => onViewFullMenu()} 
                  />
                ) : null}
              </div>            
            </div>
          );
        })}      
      </div>
      <div>
        {cartItems.length > 0 && pathname !== '/' && (
          <Button 
            text="See my cart" 
            classname="button-primary button-secondary-sm mt-8" 
            onClick={() => SeeMyCart()} 
          />
        )}
      </div>
    </div>
  );
}