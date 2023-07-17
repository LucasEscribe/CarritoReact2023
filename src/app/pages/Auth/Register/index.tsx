import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginData } from "../../../contexts/AuthContext";
import UseAuth from "../../../components/Auth/UseAuth";
import axios from 'axios';
import React from "react";
import styles from './styles.module.css';

function Register() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = UseAuth();

  const registerMutation = useMutation(
    (data: UserLoginData) => {
      return axios.post('https://api.escuelajs.co/api/v1/users/', {
        name: " ",
        email: data.email,
        password: data.password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"
      });
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
      onError: () => {
        alert("Error al registrar el usuario. Por favor, inténtelo nuevamente.");
      },
    }
  );

  let from = (location.state && location.state.from && location.state.from.pathname) || '/products/create';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let newUser: UserLoginData = { email, password };

    registerMutation.mutate(newUser);
  }

  return (
    <div className={styles.container}>
      <p>Cree un usuario para ver la página de edición.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <button type="submit">
          {registerMutation.isLoading ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;
