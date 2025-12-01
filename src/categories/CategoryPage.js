import * as React from "react";

import ProductCart from "../prodcuts/ProductCart";

export default function CategoryPage({ category }) {
  return (
    <>
      <h1>{category.name} Category </h1>
      <ProductCart categoryId={category._id} />
    </>
  );
}
