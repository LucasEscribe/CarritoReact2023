import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import QUERY_KEY_CATEGORIES from "../../../querys/categories";
import styles from "./styles.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { Category } from "../../../types/category";

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
  const { user } = useContext(AuthContext);

  return (
    <main>
      <div className={styles.header}>
        <h1 className={styles.title}>Categorías:</h1>
      </div>
      <div className={styles.main}>
        {status === "loading" && <h1>Cargando....</h1>}
        {status === "error" && <h1>Error: {(error as Error).message}</h1>}
        {status === "success" &&
          data.map((category: CategoryProps) => {
            return (
              <div key={category.id} className={styles.categoryContainer}>
                <Link
                  to={`${category.id}/products`}
                  key={category.id}
                  className={styles.category}
                >
                  <h2>{category.name}</h2>
                  <img src={category.image} alt={category.name} />
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to={`/categories/edit/${category.id}`}
                    state={{ category }}
                    className={styles.editButton}
                  >
                    Editar
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Categories;
