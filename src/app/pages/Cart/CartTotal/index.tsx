import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../../../contexts/CartContext";

function Total() {
    const { totalPrice } = useCart();

    const formattedTotal = totalPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

    return (
        <div /* className={styles.total} */>
            <FaShoppingCart size={22} />
            <p>Total Carrito: {formattedTotal}</p>
        </div>
    );
}

export default Total;
