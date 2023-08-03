import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Product } from "../../types/product";
import { useCart } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import Filter from "../Filter";
import ProductCard from "../ProductCard";
import styles from "./styles.module.css";

interface ProductComponentProps {
  categoryID?: string;
}

const fetchProducts = async (categoryID?: string, offset = 0, limit = 10) => {
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

  if (categoryID) {
    url = `https://api.escuelajs.co/api/v1/categories/${categoryID}/products?offset=${offset}&limit=${limit}`;
  }

  const res = await fetch(url);
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

function ProductComponent({ categoryID }: ProductComponentProps) {
  const { darkMode } = useContext(ThemeContext);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);

  const { data, status, error } = useQuery(
    categoryID ? ["products", categoryID, offset, limit] : ["products", offset, limit],
    () => fetchProducts(categoryID, offset, limit)
  );

  const { updateTotalPrice } = useCart();

  const handleAddProductToCart = (price: number) => {
    updateTotalPrice(price);
  };

  const handleRemoveProductFromCart = (price: number) => {
    updateTotalPrice(-price);
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  const nextPage = () => {
    setOffset(offset + limit);
  };

  const previousPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset]);

  const productContainerClassName = darkMode
  ? styles.product_container
  : `${styles.product_container} ${styles.product_containerLight}`;


  return (
    <main>
      {categoryID ? (
        <h1 className={styles.title}>Productos de la categoría {categoryID}:</h1>
      ) : (
        <h1 className={styles.title}>Todos Los Productos:</h1>
      )}
      <div className={styles.grid}>
        <Filter
          products={data || []}
          setFilteredProducts={setFilteredProducts}
        />
        {status === "loading" && <h1>Cargando....</h1>}
        {status === "error" && <h1>Error: {(error as Error).message}</h1>}
        {status === "success" &&
          filteredProducts.map((product: Product) => {
            return (
              <div key={product.id}>
                {categoryID ? (
                  <div className={productContainerClassName}>
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    images={product.images}
                    handleAddProductToCart={handleAddProductToCart}
                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                    id={product.id}
                    subtotal={product.subtotal} quantity={0}                  />
                  </div>
                ) : (
                  <Link to={`/products/${product.id}`}>
                    <div className={productContainerClassName}>
                    <ProductCard
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        images={product.images}
                        handleAddProductToCart={handleAddProductToCart}
                        handleRemoveProductFromCart={handleRemoveProductFromCart}
                        subtotal={product.subtotal}
                        id={product.id} quantity={0}                    />
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
      <div className={styles.pagination}>
        <button onClick={previousPage} disabled={offset === 0}>
          Página anterior
        </button>
        <button onClick={nextPage}>Siguiente página</button>
      </div>
    </main>
  );
}

export default ProductComponent;