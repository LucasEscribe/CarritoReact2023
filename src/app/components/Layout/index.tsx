import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import AuthStatus from "../Auth/AuthStatus";
import styles from './styles.module.css';

// Layout component structure
function Layout() {
  return (
    <div className={styles.layoutContainer}>
      {/* Navigation bar */}
      <NavBar />
      <div className={styles.outletContainer}>
        {/* Auth status */}
        <AuthStatus />
        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
