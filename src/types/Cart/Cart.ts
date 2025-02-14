export interface CartItem {
    sys: { id: string };
    fields: {
      title: string;
      price: number;
      photo?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
    quantity: number;
  }

  export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    initiateCheckout: () => Promise<void>;
  }