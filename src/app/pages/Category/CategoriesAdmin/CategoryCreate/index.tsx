import React, { useState } from "react";
import axios from 'axios';
import styles from "./styles.module.css";

function CategoryCreate() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/categories/',
        {
          name: formData.name,
          image: formData.image,
        }
      );
      alert('Categoría creada exitosamente.');
      console.log(response.data);
      setFormData({
        name: "",
        image: "",
      });
    } catch (error) {
      alert('Error al crear la categoría.')
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crear Categoría</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la Categoría:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          URL de la Imagen:{" "}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
}

export default CategoryCreate;
