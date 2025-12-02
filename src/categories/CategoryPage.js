import * as React from "react";

import ProductCard from "../prodcuts/ProductCard";

export default function CategoryPage({ category }) {
  return (
    <>
      <h1>{category.name} Category </h1>
      <ProductCard categoryId={category._id} />
    </>
  );
}
