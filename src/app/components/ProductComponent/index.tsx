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

  // Query for fetching products
  const { data, status, error } = useQuery(
    categoryID ? ["products", categoryID, offset, limit] : ["products", offset, limit],
    () => fetchProducts(categoryID, offset, limit)
  );

  const { updateTotalPrice } = useCart();

  // Handlers for updating cart total price
  const handleAddProductToCart = (price: number) => {
    updateTotalPrice(price);
  };

  const handleRemoveProductFromCart = (price: number) => {
    updateTotalPrice(-price);
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Effect to set filtered products
  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  // Handlers for pagination
  const nextPage = () => {
    setOffset(offset + limit);
  };

  const previousPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  // Scroll to top on offset change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset]);

  //JSX
  return (
    <main>
      <div className={styles.header}>
        {categoryID ? (
          <h1 className={styles.title}>Productos de la categoría {categoryID}:</h1>
        ) : (
          <h1 className={styles.title}>Todos Los Productos:</h1>
        )}
      </div>
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
              <Link key={product.id} to={`/products/${product.id}`}>
                <div>
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    images={product.images}
                    handleAddProductToCart={handleAddProductToCart}
                    handleRemoveProductFromCart={handleRemoveProductFromCart}
                    subtotal={product.subtotal}
                    id={product.id}
                    quantity={0}
                  />
                </div>
              </Link>
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