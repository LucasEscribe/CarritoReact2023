import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

type TotalProps = {
    totalPrice: number;
};

function Total(props: TotalProps) {
    const formattedTotal = props.totalPrice.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });

    return (
        <div /* className={styles.total} */>
            <FaShoppingCart size={32} />
            <p>Total Carrito: {formattedTotal}</p>
        </div>
    );
}

export default Total;