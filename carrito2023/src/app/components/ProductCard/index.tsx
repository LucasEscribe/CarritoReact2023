import { useState } from "react";
import styles from "./styles.module.css";

type ProductProps = {
  handleRemoveProductFromCart(price: number): unknown;
  handleAddProductToCart(price: number): unknown;
  id: number;
  title: string;
  price: number;
  description: string;
  category: { id: number; name: string; image: string };
  images: string;
};

function ProductCard(props: ProductProps) {
  const [quantity, setQuantity] = useState(0);

  const handleAddUnit = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    props.handleAddProductToCart(props.price);
  };

  const handleRemoveUnit = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      props.handleRemoveProductFromCart(props.price);
    }
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
    <div className={styles.product_container}>
      <div className={styles.image_container}>
        <img src={props.images} alt={props.images} className={styles.product_image} />
      </div>
      <div className={styles.info_container}>
        <h2 className={styles.title}>{props.title}</h2>
        <h3 className={styles.description}>{props.description}</h3>
        <p>{formattedPrice}</p>
      </div>

      <ul>
        <li>Categoría: {props.category.name}</li>
        <li>
          <img src={props.category.image} width={64} height={64} alt={props.category.name} />
        </li>
      </ul>
      <div className={styles.handler_subtotal}>
        <button
          className={styles.remove}
          onClick={() => {
            handleRemoveUnit();
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className={styles.add}
          onClick={() => {
            handleAddUnit();
          }}
        >
          +
        </button>
        <span>Subtotal: {formattedSubtotal}</span>
      </div>
    </div>
  );
}

export default ProductCard;
