'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/types/Cart/Cart';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { CartContextType } from '@/types/Cart/Cart';
import { Toaster } from 'react-hot-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {

    const existingItem = cartItems.find(i => i.sys.id === item.sys.id);
    
    setCartItems((prevItems) => {

        if (existingItem) {

            return prevItems.map(i =>
          i.sys.id === item.sys.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });

    if (existingItem) {
      toast.success('Item quantity increased!', {
        duration: 2000,
        position: 'bottom-right',
      });
    } else {
      toast.success('Item added to cart!', {
        duration: 2000,
        position: 'bottom-right',
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.sys.id !== itemId));
    toast.success('Item removed from cart!');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.sys.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared!');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.fields.price * item.quantity), 0);
  };

  const initiateCheckout = async () => {
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      const formattedItems = cartItems.map(item => ({
        name: item.fields.title,
        price: item.fields.price,
        quantity: item.quantity,
        currency: 'cad', 
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: formattedItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }

      const { sessionId } = await response.json();
      
      if (!sessionId) {
        throw new Error('No session ID returned from the server');
      }

      const result = await stripe?.redirectToCheckout({ sessionId });
      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      initiateCheckout
    }}>
      <Toaster />
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}