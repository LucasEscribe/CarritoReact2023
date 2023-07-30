import React from "react";
import { useCart } from "../../../contexts/CartContext";
import ProductCard from "../../../components/ProductCard";
import styles from "./styles.module.css";
import Home from "../../../pages/Home";

function CartDetail() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className={styles.gridContainer}>
        <h1>Detalle de su carrito:</h1>
        <p>Su carrito está vacío. ¡Agregue algunos productos!</p>
        <Home />
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <h1>Detalle de su carrito:</h1>
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
