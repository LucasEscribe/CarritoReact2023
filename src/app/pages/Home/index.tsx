import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido a tu sitio de compras!</h1>
      <div>
        <Link to="/categories">
          <button className={styles.button}>Ver Categorías</button>
        </Link>
      </div>
      <div>
        <Link to="/products">
          <button className={styles.button}>Ver Todos Los Productos</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
