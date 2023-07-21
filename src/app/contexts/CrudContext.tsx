import React, { createContext } from "react";

interface CrudContextValue {
  createProduct: (productData: any) => Promise<any>;
  updateProduct: (productId: any, productData: any) => Promise<any>;
  deleteProduct: (productId: any) => Promise<any>;
  createCategory: (categoryData: any) => Promise<any>;
  updateCategory: (categoryId: any, categoryData: any) => Promise<any>;
  deleteCategory: (categoryId: any) => Promise<any>;
}

const CrudContext = createContext<CrudContextValue | null>(null);

export default CrudContext;
