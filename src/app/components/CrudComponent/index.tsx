import CrudContext from "app/contexts/CrudContext";
import React from "react";

interface CrudComponentProps {
  children: React.ReactNode;
}

function CrudComponent({ children }: CrudComponentProps) {
  // Nuevo Producto
  const createProduct = async (productData) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error al crear un producto.");
    }
  };

  // Actualizar Producto
  const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to update product.");
    }
  };

  // Borrar producto
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to delete product.");
    }
  };

  // Crear Categoría
  const createCategory = async (categoryData) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to create category.");
    }
  };

  // Actualizar Categoría
  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to update category.");
    }
  };

  // Eliminar Categoría
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to delete category.");
    }
  };



  const crudContextValue = {
    createProduct,
    updateProduct,
    deleteProduct,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <CrudContext.Provider value={crudContextValue}>
      {children}
    </CrudContext.Provider>
  );
}

export default CrudComponent;
