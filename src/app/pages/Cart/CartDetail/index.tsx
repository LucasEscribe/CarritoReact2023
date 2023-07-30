import React from "react";
import { useCart } from "../../../contexts/CartContext";
import ProductCard from "../../../components/ProductCard";
import styles from "./styles.module.css";

function CartDetail() {
  const { cartItems } = useCart();

  return (
    <div className={styles.gridContainer}>
      {cartItems.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          category={product.category}
          images={product.images}
          handleAddProductToCart={() => {}}
          handleRemoveProductFromCart={() => {}}
          id={product.id}
        />
      ))}
    </div>
  );
}

export default CartDetail;
