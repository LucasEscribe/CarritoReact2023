import React, { useState } from "react";
import { Product } from "../../types/product";
import styles from "./styles.module.css";

type FilterProps = {
    products: Product[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

function Filter({ products, setFilteredProducts }: FilterProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleFilter = () => {
        let filteredProducts = [...products];

        if (title) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (category) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category.name === category
            );
        }

        if (minPrice) {
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= parseFloat(minPrice)
            );
        }

        if (maxPrice) {
            filteredProducts = filteredProducts.filter(
                (product) => product.price <= parseFloat(maxPrice)
            );
        }

        setFilteredProducts(filteredProducts);
    };

    const handleReset = () => {
        setTitle("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setFilteredProducts(products);
    };

//       \\\
//       (o>
//      \\_//
//       /\\
//       \//
//        || 
//       ===

    return (
        <div className={styles.filterContainer}>
            <h2>Filtrar Productos</h2>
            <div className={styles.formGroup}>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="minPrice">Precio Mínimo:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="maxPrice">Precio Máximo:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleFilter}>
                    Buscar
                </button>
                <button className={styles.button} onClick={handleReset}>
                    Limpiar
                </button>
            </div>
        </div>
    );
}

export default Filter;
