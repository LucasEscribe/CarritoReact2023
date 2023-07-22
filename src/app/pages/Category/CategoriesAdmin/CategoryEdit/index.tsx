import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';

function CategoryEdit() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `https://api.escuelajs.co/api/v1/categories/${id}`,
                {
                    name: category.name,
                    image: category.image,
                }
            );
            alert('Categoría actualizada exitosamente.');
            console.log(response.data);
        } catch (error) {
            alert('Error al actualizar la categoría.')
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `https://api.escuelajs.co/api/v1/categories/${id}`
            );
            alert('Categoría borrada exitosamente.');
            console.log(response.data);
            window.location.href = '/categories';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (location.state && location.state.category) {
            setCategory(location.state.category);
        } else {
            const fetchCategory = async () => {
                try {
                    const response = await axios.get(
                        `https://api.escuelajs.co/api/v1/categories/${id}`
                    );
                    setCategory(response.data);
                } catch (error) {
                    console.error("Error fetching category:", error);
                }
            };
            fetchCategory();
        }
    }, [id, location.state]);

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
