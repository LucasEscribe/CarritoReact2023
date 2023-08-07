import React from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../../../components/ProductComponent";

// This component extracts the category ID from the route parameters
// and passes it to the ProductComponent for rendering products of that category
function ProductsCategory() {
  const { categoryID } = useParams();
  return <ProductComponent categoryID={categoryID} />;
}

export default ProductsCategory;
