import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

/**
 * Component for editing a product.
 */
function ProductEdit() {
  // Get the product ID from the route parameters
  const { id } = useParams<{ id: string }>();

  // State to hold the product data
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    images: "",
  });

  // Handle input change for the form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Function to update the product using a PUT request
  const updateProduct = async () => {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
      }
    );
    return response.data;
  };

  // Create a query client instance
  const queryClient = useQueryClient();

  // Use mutation for updating the product
  const mutationUpdate = useMutation(updateProduct, {
    onSuccess: (data) => {
      alert('Producto actualizado exitosamente.');
      console.log(data);
    },
    onError: (error) => {
      alert('Error al actualizar el producto.')
      console.error(error);
    },
    onSettled: () => {
      // Invalidate the 'product' query to refetch updated data
      queryClient.invalidateQueries('product');
    },
  });

  // Handle form submission for updating the product
  const handleUpdate = (event) => {
    event.preventDefault();
    mutationUpdate.mutate();
  };

  // Function to delete the product
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      alert('Producto eliminado exitosamente.');
      console.log(response.data);
      window.location.href = '/categories';
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch product data using a query
  const { data, isLoading, isError } = useQuery('product', async () => {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return response.data;
  });

  // Set the product data when fetched
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error en la data del producto.</div>;
  }

  return (
    <div className="container">
      <h1>Editar Producto</h1>
      <div>
        <form onSubmit={handleUpdate}>
          <label>
            Nuevo Título:{" "}
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Nuevo Precio:{" "}
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Nueva Descripción:{" "}
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Nueva Imagen:{" "}
            <input
              type="text"
              name="images"
              value={product.images}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Actualizar Producto</button>
        </form>
      </div>
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Precio: {product.price}</p>
        <img src={product.images} alt={product.title} />
      </div>
      <button onClick={handleDelete}>Eliminar Producto</button>
    </div>
  );
}

export default ProductEdit;
