import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import AuthStatus from "../Auth/AuthStatus";
import styles from './styles.module.css';

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <NavBar />
      <div className={styles.outletContainer}>
        <AuthStatus />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
