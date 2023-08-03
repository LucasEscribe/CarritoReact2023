import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginData, UserLoginDataResponse } from "../../../contexts/AuthContext";
import UseAuth from "../../../components/Auth/UseAuth";
import axios from 'axios';
import React from "react";
import styles from './styles.module.css';

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = UseAuth();
  let from = location.state?.from || '/';

  const signinMutation = useMutation(
    (data: UserLoginData) => {
      return axios.post('https://api.escuelajs.co/api/v1/auth/login', data);
    },
    {
      onSuccess: async (data) => {
        const token = data.data.access_token;
        const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const profileData: UserLoginDataResponse = {
          access_token: token,
          role: profileResponse.data.role,
          name: ""
        };
        auth.signin(profileData, () => {
          if (profileData.role === 'admin') {
            navigate('/auth', { replace: true });
          } else {
            navigate('/cart-detail', { replace: true });
          }
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
      <p>Ingrese su usuario y contraseña:</p>
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
