import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginData, UserLoginDataResponse } from "../../../contexts/AuthContext";
import UseAuth from "../../../components/Auth/UseAuth";
import axios from 'axios';
import React, { useState } from "react";
import styles from './styles.module.css';

/**
 * Register page component.
 */
function Register() {
  let navigate = useNavigate();
  let auth = UseAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Mutation to handle user registration
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
          role: isAdmin ? "admin" : "customer",
          name: ""
        };
        auth.signin(userData, () => {
          if (isAdmin) {
            navigate('/auth', { replace: true });
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

  // Handle form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let newUser: UserLoginData = { email, password };

    registerMutation.mutate(newUser);
  }

  // Handle admin checkbox change
  function handleAdminCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsAdmin(event.target.checked);
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>Cree un usuario Cliente para ver el detalle de su carrito.</p>
      <p className={styles.text}>Cree un usuario Administrador para modificar o crear productos y categorías.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email: <input name="email" type="text" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleAdminCheckboxChange}
          />
          <p className={styles.text}>Marque para crear un usuario administrador</p>
        </label>
        <button type="submit">
          {registerMutation.isLoading ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;
