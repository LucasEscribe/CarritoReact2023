import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import QUERY_KEY_PRODUCTS_CATEGORY from "../../../querys/products";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../contexts/CartContext";
import { Product } from "../../../types/product";
import styles from "./styles.module.css";
import Filter from "../../../components/Filter";

const fetchProducts = async (categoryID: string) => {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${categoryID}/products`
  );
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

function ProductsCategory() {
  const { categoryID } = useParams();
  const { data, status, error } = useQuery(
    [QUERY_KEY_PRODUCTS_CATEGORY, categoryID],
    () => fetchProducts(categoryID || "")
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

  return (
    <main>
      <h1>Productos de la categoría {categoryID}:</h1>
      <div className={styles.grid}>
        <Filter products={data || []} setFilteredProducts={setFilteredProducts} />
        {status === "loading" && <h1>Cargando....</h1>}
        {status === "error" && <h1>Error: {(error as Error).message}</h1>}
        {status === "success" &&
          filteredProducts.map((product: Product) => {
            return (
              <div key={product.id}>
                <ProductCard
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  images={product.images}
                  handleAddProductToCart={handleAddProductToCart}
                  handleRemoveProductFromCart={handleRemoveProductFromCart}
                  id={product.id}
                />
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default ProductsCategory;
