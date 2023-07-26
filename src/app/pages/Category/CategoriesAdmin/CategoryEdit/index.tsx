import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function CategoryEdit() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const queryClient = useQueryClient();

    const [category, setCategory] = useState({
        name: "",
        image: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const updateCategory = async () => {
        const response = await axios.put(
            `https://api.escuelajs.co/api/v1/categories/${id}`,
            {
                name: category.name,
                image: category.image,
            }
        );
        return response.data;
    };

    const deleteCategory = async () => {
        const response = await axios.delete(
            `https://api.escuelajs.co/api/v1/categories/${id}`
        );
        return response.data;
    };

    const mutationUpdate = useMutation(updateCategory, {
        onSuccess: (data) => {
            alert('Categoría actualizada exitosamente.');
            console.log(data);
        },
        onError: (error) => {
            alert('Error al actualizar la categoría.');
            console.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['categories', id]);
        },
    });

    const mutationDelete = useMutation(deleteCategory, {
        onSuccess: (data) => {
            alert('Categoría borrada exitosamente.');
            console.log(data);
            window.location.href = '/categories';
        },
        onError: (error) => {
            console.error(error);
        },
        onSettled: () => {
        },
    });

    const { data, isLoading, isError } = useQuery('category', async () => {
        if (location.state && location.state.category) {
            return location.state.category;
        } else {
            const response = await axios.get(
                `https://api.escuelajs.co/api/v1/categories/${id}`
            );
            return response.data;
        }
    });

    React.useEffect(() => {
        if (data) {
            setCategory(data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (isError) {
        return <div>Error en la data de la categoría.</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        mutationUpdate.mutate();
    };

    const handleDelete = () => {
        mutationDelete.mutate();
    };

    return (
        <div className="container">
            <h1>Editar Categoría</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nuevo Nombre Categoría:{" "}
                        <input
                            type="text"
                            name="name"
                            value={category.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        URL nueva Imagen:{" "}
                        <input
                            type="text"
                            name="image"
                            value={category.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Actualizar Categoría</button>
                </form>
            </div>
            <div>
                <h2>{category.name}</h2>
                <img src={category.image} alt={category.name} />
            </div>
            <button onClick={handleDelete}>Borrar Categoría</button>
        </div>
    );
}

export default CategoryEdit;
