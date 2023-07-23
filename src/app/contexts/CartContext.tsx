import { createContext, useContext, useState } from "react";

type CartContextType = {
  totalPrice: number;
  updateTotalPrice: (price: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const updateTotalPrice = (price: number) => {
    setTotalPrice(totalPrice + price);
  };

  return (
    <CartContext.Provider value={{ totalPrice, updateTotalPrice }}>
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
