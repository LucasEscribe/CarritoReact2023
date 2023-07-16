import React from "react";
import { useParams } from "react-router-dom";
import ProductComponent from "../../../components/ProductComponent";

function ProductsCategory() {
  const { categoryID } = useParams();
  return <ProductComponent categoryID={categoryID} />;
}

export default ProductsCategory;
