import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../UseAuth"
import React from "react";

function AuthStatus() {
    let location = useLocation();
    let auth = useAuth();

    if (!auth.user) {
        return <p>Usted no está loggeado.</p>
    }

    return (
        <p>
            Bienvenido {auth.user.access_token}!{' '}
            <button onClick={() => {
                auth.signout(() => <Navigate to="/" />);
            }}
            >
                Cerrar Sesión
            </button>
        </p>
    );
}

export default AuthStatus;