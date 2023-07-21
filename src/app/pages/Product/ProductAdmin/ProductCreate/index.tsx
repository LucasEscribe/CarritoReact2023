import React, { useState, useEffect } from "react";

function ProductCreate() {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: "",
    });


    const [categories, setCategories] = useState<{ id: number; name: string }[]>(
        []
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Producto creado exitosamente");
        setFormData({
            title: "",
            price: "",
            description: "",
            categoryId: "",
            images: "",
        });
    };

    useEffect(() => {
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

    return (
        <div className="container">
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
                        type="file"
                        accept="image/*"
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
