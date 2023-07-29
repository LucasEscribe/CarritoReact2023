import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function ProductEdit() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    images: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

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

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries('product');
    },
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    mutationUpdate.mutate();
  };

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

  const { data, isLoading, isError } = useQuery('product', async () => {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return response.data;
  });

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
