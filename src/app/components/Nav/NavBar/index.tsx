import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useCart } from '../../../contexts/CartContext';
import Total from "../../../pages/Cart/CartTotal";
import styles from './styles.module.css';
import React from 'react';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

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
                <button className={styles.menuButton} onClick={handleMenuClick}>
                    <span className={styles.menuIcon}>&#8942;</span>
                </button>
                {menuOpen &&
                    createPortal(
                        <div className={styles.menu}>
                            <ul className={styles.menuList}>
                                <li>
                                    <Link to="/login" onClick={handleMenuClick}>Inicio de Sesión *</Link>
                                </li>
                                <li>
                                    <Link to="/register" onClick={handleMenuClick}>Registro de Usuario *</Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={handleMenuClick}>Inicio</Link>
                                </li>
                                <li>
                                    <Link to="/categories" onClick={handleMenuClick}>Categorías</Link>
                                </li>
                                <li>
                                    <Link to="/products" onClick={handleMenuClick}>Productos</Link>
                                </li>
                                <li>
                                    <Link to="/cart-detail" onClick={handleMenuClick}>Detalle del Carrito *</Link>
                                </li>
                            </ul>
                            <button
                                className={`${styles.themeButton} ${darkMode ? "light-mode" : "dark-mode"}`}
                                onClick={handleToggleDarkMode}
                            >
                                {darkMode ? "☀️" : "🌙"}
                            </button>
                        </div>,
                        document.body
                    )}
                <div className={styles.rightContent}>
                    <Total totalPrice={totalPrice} />
                </div>
            </div>
        </>
    );
}

export default NavBar;

