import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginData, UserLoginDataResponse } from "../../../contexts/AuthContext";
import UseAuth from "../../../components/Auth/UseAuth";
import axios from 'axios';
import React, { useState } from "react";
import styles from './styles.module.css';

function Register() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = UseAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const registerMutation = useMutation(
    (data: UserLoginData) => {
      return axios.post('https://api.escuelajs.co/api/v1/users/', {
        name: " ",
        email: data.email,
        password: data.password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        role: isAdmin ? "admin" : "customer"
      });
    },
    {
      onSuccess: (data) => {
        const userData: UserLoginDataResponse = {
          access_token: data.data.access_token,
          role: isAdmin ? "admin" : "customer"
        };
        auth.signin(userData, () => {
          if (isAdmin) {
            navigate('/products/create', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        });
        console.log(isAdmin)
      },
      onError: () => {
        alert("Error al registrar el usuario. Por favor, inténtelo nuevamente.");
      },
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let newUser: UserLoginData = { email, password };

    registerMutation.mutate(newUser);
  }

  function handleAdminCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsAdmin(event.target.checked);
  }

  return (
    <div className={styles.container}>
      <p>Cree un usuario Administrador para ver la página de edición.</p>
      <p>Cree un usuario Cliente para ver el detalle de su carrito.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleAdminCheckboxChange}
          />
          Crear usuario administrador
        </label>
        <button type="submit">
          {registerMutation.isLoading ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;
