import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useCart } from '../../../contexts/CartContext';
import Total from "../../../pages/Cart/CartTotal";
import styles from './styles.module.css';
import React from 'react';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        document.body.classList.toggle("dark-mode");
    };

    const { totalPrice } = useCart();

    const { user } = useContext(AuthContext);

    const { signout } = useContext(AuthContext);

    const handleSignout = () => {
        signout(() => {
            <Navigate to="/" />
        });
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [menuOpen]);

    return (
        <>
            <div className={styles.navbarContainer}>
                <div>
                    <button className={`${styles.menuButton} ${styles.transparentButton}`} onClick={handleMenuClick}>
                        <span className={styles.menuIcon}>&#8942;</span>
                    </button>
                </div>
                <div className={styles.rightContent}>
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className={`${styles.loginButton} ${styles.transparentButton}`}>
                                    Iniciar Sesión
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className={`${styles.registerButton} ${styles.transparentButton}`}>
                                    Registrarse
                                </button>
                            </Link>
                        </>
                    ) : user.role === "admin" || user.role === "customer" ? (
                        <Link to="/cart-detail" className={`${styles.totalButton} ${styles.transparentButton}`}>
                            <Total totalPrice={totalPrice} />
                        </Link>
                    ) : null}
                </div>
            </div>
            {menuOpen &&
                createPortal(
                    <div className={styles.menu} ref={menuRef}>
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

                            <br />
                            {user ? (
                                <>
                                    {user.role === "admin" ? (
                                        <>
                                            <li>
                                                <Link to="/products/create" onClick={handleMenuClick}>
                                                    Nuevo Producto
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/categories/create" onClick={handleMenuClick}>
                                                    Nueva Categoría
                                                </Link>
                                            </li>
                                            <br />
                                            <li>
                                                <Link to="/cart-detail" onClick={handleMenuClick}>
                                                    Detalle del Carrito
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/cart-detail" onClick={handleMenuClick}>
                                                    Detalle del Carrito
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <li>
                                            <button className={styles.logoutButton} onClick={handleSignout}>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </li>
                                </>
                            ) : (
                                <>
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
                                            <p>Registro de Usuario</p>
                                        </Link>
                                    </li>
                                </>
                            )}
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
        </>
    );
}

export default NavBar;