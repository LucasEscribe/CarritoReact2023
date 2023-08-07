import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styles from "./styles.module.css";

/**
 * Component for creating a new product.
 */
function ProductCreate() {
    // State variables
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: "",
    });

    // Data
    const [categories, setCategories] = useState<{ id: number; name: string }[]>(
        []
    );

    // Query client
    const queryClient = useQueryClient();

    // Event handlers
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Mutations
    const createProduct = async () => {
        const response = await axios.post(
            'https://api.escuelajs.co/api/v1/products/',
            {
                title: formData.title,
                price: formData.price,
                description: formData.description,
                categoryId: formData.categoryId,
                images: [formData.images],
            }
        );
        return response.data;
    };

    const mutationCreate = useMutation(createProduct, {
        onSuccess: (data) => {
            alert('Producto creado exitosamente.');
            console.log(data);
            setFormData({
                title: '',
                price: '',
                description: '',
                categoryId: '',
                images: '',
            });
        },
        onError: (error) => {
            alert('Error al crear el producto.');
            console.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('products');
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        mutationCreate.mutate();
    };

    // Effects
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://api.escuelajs.co/api/v1/categories"
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Render
    return (
        <div className={styles.container}>
            <h1>Crear Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre del Producto:{" "}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Precio:{" "}
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Descripción:{" "}
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Categoría:
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Selecciona Imagen:{" "}
                    <input
                        type="text"
                        name="images"
                        value={formData.images}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
}

export default ProductCreate;
