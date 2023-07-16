import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useCart } from '../../../contexts/CartContext';
import Total from "../../../pages/Cart/CartTotal";
import styles from './styles.module.css';
import React from 'react';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // menú click
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    //modo oscuro:
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        document.body.classList.toggle("dark-mode");
    };

    const { totalPrice } = useCart();

    console.log(darkMode)
    return (
        <>
            <div className={styles.navbarContainer}>
                <div>
                    <button className={`${styles.menuButton} ${styles.transparentButton}`} onClick={handleMenuClick}>
                        <span className={styles.menuIcon}>&#8942;</span>
                    </button>
                </div>
                <div className={styles.rightContent}>
                    <button className={`${styles.totalButton} ${styles.transparentButton}`}>
                        <Total totalPrice={totalPrice} />
                    </button>
                </div>
                {menuOpen &&
                    createPortal(
                        <div className={styles.menu}>
                            <ul className={styles.menuList}>
                                <li>
                                    <Link to="/" onClick={handleMenuClick}>
                                        <h2>Inicio</h2>
                                    </Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/categories" onClick={handleMenuClick}>
                                        Categorías
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" onClick={handleMenuClick}>
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cart-detail" onClick={handleMenuClick}>
                                        * Detalle del Carrito *
                                    </Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/login" onClick={handleMenuClick}>
                                        <h3>Wellcome Back!</h3>
                                        <p>Inicio de Sesión</p>
                                    </Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/register" onClick={handleMenuClick}>
                                        <h3>Primer Ingreso?</h3>
                                        <p>* Registro de Usuario *</p>
                                    </Link>
                                </li>

                            </ul>
                            <button
                                className={`${styles.themeButton} ${darkMode ? "dark-mode" : "light-mode"}`}
                                onClick={handleToggleDarkMode}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                        </div>,
                        document.body
                    )}
            </div>
        </>
    );
}

export default NavBar;