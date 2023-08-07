import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../../../contexts/CartContext";
import styles from './styles.module.css';

/**
 * Component displaying the total price of items in the cart.
 */
function Total() {
    const { totalPrice } = useCart();

    // Format total price as currency
    const formattedTotal = totalPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

    // Render the total component
    return (
        <div className={styles.total} >
            <FaShoppingCart size={22} />
            <p>Total Carrito:</p>
            {formattedTotal}
        </div>
    );
}

export default Total;
