import React, { useEffect, useState } from "react";
import { Product } from "../../types/product";
import styles from "./styles.module.css";
import { Category } from "../../types/category";

type FilterProps = {
    products: Product[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

function Filter({ products, setFilteredProducts }: FilterProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
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

    const handleClose = () => {
        setSearchOpen(!searchOpen);
    }

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/categories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <>
            {searchOpen && (
                <div className={styles.filterContainer}>
                    <div className={styles.filterHeader}>
                        <h2>Filtrar Productos</h2>
                        <button className={`${styles.closeButton}`} onClick={handleClose}>
                            &#x2715;
                        </button>
                    </div>
                    <div className={styles.form}>
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
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
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
            )}
            {!searchOpen && (
                <div className={styles.searchIconContainer}>
                    <button
                        className={`${styles.themeButton} ${styles.searchIcon}`}
                        onClick={handleClose}
                    >
                        🔍
                    </button>
                </div>
            )}
        </>
    );
}

export default Filter;
