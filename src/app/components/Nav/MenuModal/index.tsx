import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from '../NavBar/styles.module.css';
import { Product } from '../../../types/product';
import Filter from '../../Filter'

type MenuModalProps = {
    menuOpen: boolean;
    handleMenuClick: () => void;
};

const MenuModal: React.FC<MenuModalProps> = ({ menuOpen, handleMenuClick }) => {
    if (!menuOpen) return null;

    // Creating a reference to interact with the DOM element using useRef
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Access user context
    const { user } = useContext(AuthContext);
    // Access theme context

    // Toggle dark mode and apply to body
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        document.body.classList.toggle("dark-mode");
    };

    // Sign out user
    const { signout } = useContext(AuthContext);

    const handleSignout = () => {
        signout(() => {
            <Navigate to="/" />
        });
    };

    // Handle click outside menu to close
    const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            handleMenuClick();
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleMenuClick]);

    // Render the menu modal
    return createPortal(
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
            <div className={`${styles.buttonsBelow}`}>
                <button
                    className={`${styles.themeButton} ${darkMode ? "dark-mode" : "light-mode"}`}
                    onClick={handleToggleDarkMode}
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>
            </div>
        </div>,
        document.body
    )
};

export default MenuModal;
