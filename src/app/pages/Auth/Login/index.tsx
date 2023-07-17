import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginData, UserLoginDataResponse } from "../../../contexts/AuthContext"
import UseAuth from "../../../components/Auth/UseAuth";
import axios from 'axios';
import React from "react";
import styles from './styles.module.css'

function Login() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = UseAuth();
    let from = (location.state && location.state.from && location.state.from.pathname) || '/products/create';
    
    const signinMutation = useMutation(
        (data: UserLoginData) => {
            return axios.post('https://api.escuelajs.co/api/v1/auth/login', data);
        },
        {
            onSuccess: (data) => {
                const userData = {
                    access_token: data.data.access_token,
                };
                auth.signin(userData, () => {
                    navigate(from, { replace: true });
                });
            },
            onError: (data) => {
                alert("Usuario o clave incorrecto.");
            },
        }
    );


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let email = formData.get('email') as string;
        let password = formData.get('password') as string;
        let newUser: UserLoginData = { email, password };

        signinMutation.mutate(newUser);
    }


    return (
        <div className={styles.container}>
            <p>Debe estar loggeado para ver la página de {from}</p>
            <p>Debe estar loggeado para ver la página de edición.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Email: <input name="email" type="text" />
                </label>
                <label>
                    Password: <input name="password" type="password" />
                </label>
                <button type="submit">
                    {signinMutation.isLoading ? 'Cargando...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;