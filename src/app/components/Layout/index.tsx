import { Outlet } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import styles from './styles.module.css';

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <NavBar />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
