import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import QUERY_KEY_CATEGORIES from "../../../querys/categories";
import styles from "./styles.module.css";
import React from "react";
import { Category } from "../../../types/category"

type CategoryProps = Category;

const fetchCategories = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json;
};

function Categories() {
    const { data, status, error } = useQuery(QUERY_KEY_CATEGORIES, fetchCategories);

    return (
        <main>
            <h1>Categorías:</ h1>
            <div className={styles.main}>
                {status === "loading" && <h1>Cargando....</h1>}
                {status === "error" && <h1>Error: {(error as Error).message}</h1>}
                {status === "success" &&
                    data.map((category: CategoryProps) => {
                        return (
                            <Link
                                to={`${category.id}/products`}
                                key={category.id}
                                className={styles.category}
                            >
                                <h2>{category.name}</h2>
                                <img src={category.image} alt={category.name} />
                            </Link>
                        );
                    })}
            </div>
        </main>
    );
}

export default Categories;
