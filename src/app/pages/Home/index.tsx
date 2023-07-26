import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido a tu sitio de compras!</h1>
      <div>
        <Link to="/categories" className={styles.link}>
          Ver Categorías
        </Link>
        <Link to="/products" className={styles.link}>
          Ver Todos Los Productos
        </Link>
      </div>
    </div>
  );
}



export default Home;
