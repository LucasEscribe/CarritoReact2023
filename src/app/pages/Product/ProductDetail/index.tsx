import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  const images = Array.isArray(product.images)
    ? product.images
    : [product.images];

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img
            src={product.images}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            <h2>{product.title}</h2>
          </div>
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>
          <div className={styles.price}>
            <p>Precio: <span className={styles.highlight}>{formattedPrice}</span></p>
          </div>
          <div className={styles.handlerSubtotal}>
            <div className={styles.handler}>
              <button className={styles.remove} onClick={handleRemoveUnit}>
                -
              </button>
              <span className={styles.counter}>{quantity}</span>
              <button className={styles.add} onClick={handleAddUnit}>
                +
              </button>
            </div>
            <div className={styles.subtotal}>
              <p>Subtotal: <span className={styles.highlight}>{formattedSubtotal}</span></p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Link to={`/cart-detail`}>
              <button className={styles.categoryButton}>
                Ver Carrito
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.carruselContainer}>
        <div className={styles.gridContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className={styles.gridImage}
            />
          ))}
        </div>
      </div>

      <div className={styles.productCategoryContainer}>
        <div className={styles.productCategoryFrame}>
          <Link to={`/categories/${product.category.id}/products`}>
            <h3 className={styles.categoryTitle}>Ver Categoría</h3>
            <h2 className={styles.categoryName}>{product.category.name}</h2>
            <img
              src={product.category.image}
              width={128}
              height={128}
              alt={product.category.name}
            />
          </Link>
        </div>
      </div>

    </>
  );
}

export default ProductDetail;
