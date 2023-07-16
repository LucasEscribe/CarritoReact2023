import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Product } from "../../../types/product";
import styles from "./styles.module.css";
import { useCart } from "../../../contexts/CartContext";

const fetchProduct = async (productID: string) => {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productID}`
  );
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

function ProductDetail() {
  const { productID } = useParams();
  const { data, status, error } = useQuery(
    ["product", productID],
    () => fetchProduct(productID || "")
  );

  const { updateTotalPrice } = useCart();

  // Mover aquí la declaración del estado quantity y setQuantity
  const [quantity, setQuantity] = useState(0);

  const handleAddUnit = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateTotalPrice(data.price);
  };

  const handleRemoveUnit = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateTotalPrice(-data.price);
    }
  };

  if (status === "loading") {
    return <h1>Cargando...</h1>;
  }

  if (status === "error") {
    return <h1>Error: {(error as Error).message}</h1>;
  }

  const product: Product = data;

  const formattedPrice = product.price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const subtotal = quantity * product.price;
  const formattedSubtotal = subtotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img
          src={product.images}
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>{product.title}</h2>
        <h3 className={styles.description}>{product.description}</h3>
        <p>Precio: {formattedPrice}</p>
        <div className={styles.handlerSubtotal}>
          <button className={styles.remove} onClick={handleRemoveUnit}>
            -
          </button>
          <span>{quantity}</span>
          <button className={styles.add} onClick={handleAddUnit}>
            +
          </button>
          <span>Subtotal: {formattedSubtotal}</span>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <p>Categoría: {product.category.name}</p>
        <img src={product.category.image} width={64} height={64} alt={product.category.name} />
      </div>
    </div>
  );
}

export default ProductDetail;