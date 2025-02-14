'use client';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Button from '@/app/components/Button/Button';
import './cart.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, initiateCheckout } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center font-playfair text-[var(--primary-color)] py-8">
        Your Cart
      </h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div 
            key={item.sys.id} 
            className="flex flex-col md:flex-row items-center bg-[var(--background-white)] p-6 rounded-lg shadow-md border border-gray-100"
          >
            {item.fields.photo && (
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <Image
                  src={`https:${item.fields.photo.fields.file.url}`}
                  alt={item.fields.title}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full h-auto image-item-menu"
                />
              </div>
            )}
            <div className="md:ml-6 flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2">{item.fields.title}</h3>
              <p className="text-[var(--secondary-color)] text-lg font-semibold mb-4">${item.fields.price}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.sys.id, Math.max(0, item.quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.sys.id, item.quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.sys.id)}
                  className="text-[var(--secondary-color)] hover:text-red-700 transition-colors font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-[var(--primary-color)] mb-6">
            Total: ${getCartTotal().toFixed(2)}
          </p>
          <Button
            text="Proceed to Checkout"
            classname="button-primary w-full md:w-auto"
            onClick={initiateCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;