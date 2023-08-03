import { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useCart } from '../../../contexts/CartContext';
import MenuModal from '../MenuModal';
import Total from "../../../pages/Cart/CartTotal";
import styles from './styles.module.css';
import React from 'react';
import Filter from '../../../components/Filter';
import { Product } from '../../../types/product';
import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCart } from '@mui/icons-material';


function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const isCartDetailPage = location.pathname === "/cart-detail";

    const handleSearchClick = () => {
        setSearchOpen(!searchOpen);
    };

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);

        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
    };

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const { totalPrice } = useCart();

    const { user } = useContext(AuthContext);


    return (
        <>
            <div className={styles.navbarContainer}>
                <div>
                    <button
                    className={`${styles.menuButton} ${styles.transparentButton}`}
                    onClick={handleMenuClick}>
                        <span className={styles.menuIcon}>&#8942;</span>
                    </button>
                </div>
                <Link to="/">
                    <div className={styles.logoCenter}>
                        <ShoppingCart fontSize="large" />
                        <p>RitoShopa</p>
                    </div>
                </Link>
                
                {isCartDetailPage && totalPrice != 0 && (
                    <div className={styles.cartButton}>
                        <Link to={`/buy`}>
                            <button className={styles.categoryButton}>
                                Finalizar Compra
                            </button>
                        </Link>
                    </div>
                )} 
                
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
                            <Total />
                        </Link>
                    ) : null}
                </div>
            </div>

            {searchOpen && (
                <div className={styles.filterMenu}>
                    <Filter products={filteredProducts} setFilteredProducts={setFilteredProducts} />
                </div>

            )}
            <MenuModal
                menuOpen={menuOpen}
                handleMenuClick={handleMenuClick}
                handleSearchClick={handleSearchClick}
                filteredProducts={filteredProducts}
            />
        </>
    );
}

export default NavBar;