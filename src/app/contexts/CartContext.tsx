import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number, name: string, image: string };
  images: string;
  quantity: number;
  subtotal: number;
};

type CartContextType = {
  cartItems: CartItem[];
  totalPrice: number;
  updateCart: (product: CartItem) => void;
  removeItemFromCart: (productId: number) => void;
  updateTotalPrice: (price: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  
  const calculateTotalPrice = (cart: CartItem[]) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const updateCart = (product: CartItem) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity = product.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  const removeItemFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateTotalPrice = (price: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, updateCart, removeItemFromCart, updateTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cartContext;
}
