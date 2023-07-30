import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Product } from "../../../types/product";
import styles from "./styles.module.css";
import { useCart } from "../../../contexts/CartContext";
import { AuthContext } from "../../../contexts/AuthContext";
import ProductCard from "../../../components/ProductCard";

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
  const { user } = useContext(AuthContext);

  const { updateCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  const handleUpdateCart = (quantityChange: number) => {
    setQuantity((prevQuantity) => prevQuantity + quantityChange);
    updateCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantityChange,
      description: product.description,
      category: {
        id: product.category.id,
        name: product.category.name,
        image: product.category.image,
      },
      images: product.images,
    });
  };

  const handleAddUnit = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    handleUpdateCart(1);
  };

  const handleRemoveUnit = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      handleUpdateCart(-1);
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
        <ProductCard
          title={product.title}
          price={product.price}
          description={product.description}
          category={product.category}
          images={product.images}
          handleAddProductToCart={handleAddUnit}
          handleRemoveProductFromCart={handleRemoveUnit}
          id={product.id}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/cart-detail`}>
          <button className={styles.categoryButton}>Ver Carrito</button>
        </Link>
        {user?.role === "admin" && (
          <Link
            to={`/products/edit/${product.id}`}
            className={styles.editButton}
          >
            <button className={styles.categoryButton}>Editar</button>
          </Link>
        )}
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