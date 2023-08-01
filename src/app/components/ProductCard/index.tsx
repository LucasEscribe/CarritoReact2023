import React from "react";
import { useState } from "react";
import { Product } from "../../types/product";
import { HandleProductCart } from "../../types/handleProductCart";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useCart } from "../../contexts/CartContext";

type ProductProps = Product;
type HandleProps = HandleProductCart;

function ProductCard(props: ProductProps & HandleProps) {
  const { cartItems, updateCart, removeItemFromCart } = useCart();
  const cartItem = cartItems.find((item) => item.id === props.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const [quantity, setQuantity] = useState(currentQuantity);
  const location = useLocation();
  const isCartDetailPage = location.pathname === "/cart-detail";


  const handleUpdateCart = (quantityChange: number) => {
    const newQuantity = quantity + quantityChange;
    setQuantity(newQuantity);
    updateCart({
      ...props,
      quantity: newQuantity,
      subtotal: newQuantity * props.price,
    });
  };

  const handleAddUnit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleUpdateCart(1);
  };

  const handleRemoveUnit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (quantity > 0) {
      handleUpdateCart(-1);
    }
  };

  const handleRemoveFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeItemFromCart(props.id);
    setQuantity(0);
  };


  const formattedPrice = props.price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const subtotal = quantity * props.price;
  const formattedSubtotal = subtotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });


  return (
    <Link to={`/products/${props.id}`} className={styles.productLink}>
      <div className={styles.product_container}>
        <div className={styles.image_container}>
          <img src={props.images} alt={props.images} className={styles.product_image} />
        </div>
        <div className={styles.info_container}>
          <h2 className={styles.title}>{props.title}</h2>
          <h3 className={styles.description}>{props.description}</h3>
          <p className={styles.price}>{formattedPrice}</p>
        </div>
        <div className={styles.handler_subtotal}>
          <div className={styles.handler}>
            <button
              className={styles.remove}
              onClick={(event) => {
                handleRemoveUnit(event);
              }}
            >
              -
            </button>
            <span className={styles.counter}>{quantity}</span>
            <button
              className={styles.add}
              onClick={(event) => {
                handleAddUnit(event);
              }}
            >
              +
            </button>
          </div>
          <div className={styles.subtotal}>
            <p>Subtotal: {formattedSubtotal}</p>
          </div>

          {quantity > 0 && (
            <>
              <div className={styles.removeButton}>
                <button onClick={handleRemoveFromCart}>Quitar del carrito</button>
              </div>
              {!isCartDetailPage && (
                <div className={styles.cartButton}>
                  <Link to={`/cart-detail`}>
                    <button className={styles.categoryButton}>Ver Carrito</button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
