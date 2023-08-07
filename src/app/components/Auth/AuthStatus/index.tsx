import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../UseAuth";
import React from "react";
import styles from "./styles.module.css";

function AuthStatus() {
  let location = useLocation();
  let auth = useAuth();

  // Display greeting for visitor or welcome for authenticated user.
  if (!auth.user) {
    return <p className={styles.greeting}>Hola, Visitante!</p>;
  }

  return (
    <div className={styles.authContainer}>
      <p className={styles.greeting}>Bienvenido, {auth.user.role}!</p>
      <button
        className={styles.logoutButton}
        onClick={() => {
          auth.signout(() => <Navigate to="/" />);
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default AuthStatus;
