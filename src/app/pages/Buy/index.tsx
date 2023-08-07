import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useCart } from "../../contexts/CartContext";

/**
 * Buy page component.
 */
function Buy() {
  const { cartItems, totalPrice, updateTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Handle buy all button click
  const handleBuyAll = () => {
    alert("¡Compra realizada con éxito!");
    updateTotalPrice(0);
    clearCart();
  };

  // Format total price as currency
  const formattedTotal = totalPrice.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  // Render the component
  if (cartItems.length === 0) {
    return (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>¡Gracias por su compra!</h1>
        </div>
        <div className={styles.centeredButton}>
          <button onClick={() => navigate("/")} className={styles.buyButton}>Volver a la página principal</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>¡Finalicemos su compra!</h1>
      </div>
      <div className={styles.cartContainer}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.category.image} alt={item.title} className={styles.cartItemImage} />
            <span className={styles.cartItemName}>{item.title}</span>
            <span className={styles.cartItemQuantity}>{item.quantity}</span>
          </div>
        ))}
        <div className={styles.totalContainer}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalPrice}>{formattedTotal}</span>
        </div>
      </div>
      <div className={styles.centeredButton}>
        <button onClick={handleBuyAll} className={styles.buyButton}>Comprar todo</button>
      </div>
    </>
  );
}

export default Buy;
