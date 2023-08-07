
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import React from "react";

/**
 * Component for the authenticated home page.
 */
function HomeAuth() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>¡Bienvenido a tu sitio de ventas!</h1>
            <div>
                <Link to="/products/create" className={styles.link}>
                    Crear Producto
                </Link>
                <Link to="/categories/create" className={styles.link}>
                    Crear Categoría
                </Link>
            </div>
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



export default HomeAuth;
