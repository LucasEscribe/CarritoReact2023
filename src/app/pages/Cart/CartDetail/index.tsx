import React from "react";
import { useCart } from "../../../contexts/CartContext";
import ProductCard from "../../../components/ProductCard";
import styles from "./styles.module.css";
import Home from "../../../pages/Home";

function CartDetail() {
  const { cartItems } = useCart();

  return (
    <>
      <div className={styles.header}>
      <h1 className={styles.title}>Detalle de su carrito:</h1>
        {cartItems.length === 0 && (
          <p>Su carrito está vacío. ¡Agregue algunos productos!</p>
        )}
      </div>
      <div className={styles.gridContainer}>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
              images={product.images}
              handleAddProductToCart={() => { } }
              handleRemoveProductFromCart={() => { } }
              subtotal={product.subtotal}
              id={product.id}
              quantity={0}            />
          ))
        ) : (
          <div className={styles.emptyCartContainer}>
            <Home />
          </div>
        )}
      </div>
    </>
  );
}

export default CartDetail;
