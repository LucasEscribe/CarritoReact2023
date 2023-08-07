import React, { useState } from "react";
import { useMutation } from 'react-query';
import styles from "./styles.module.css";
import axios from "axios";

const createCategory = async (formData) => {
  const response = await axios.post(
    'https://api.escuelajs.co/api/v1/categories/',
    {
      name: formData.name,
      image: formData.image,
    }
  );
  return response.data;
};

/**
 * Component for creating a new category.
 */
function CategoryCreate() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // Update form data when inputs change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Create a new category mutation
  const mutation = useMutation(createCategory, {
    onSuccess: (data) => {
      alert('Categoría creada exitosamente.');
      console.log(data);
      setFormData({
        name: "",
        image: "",
      });
    },
    onError: (error) => {
      alert('Error al crear la categoría.')
      console.error(error);
    },
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  // Render the category creation form
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
            onChange={handleChange}
          />
        </label>
        <label>
          URL de la Imagen:{" "}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
}

export default CategoryCreate;
