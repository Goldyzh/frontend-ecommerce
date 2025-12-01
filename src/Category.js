import * as React from "react";

import Product from "./Product";

export default function Category({ category }) {
  return (
    <>
      <h1>{category.name} Category </h1>
      <Product categoryId={category._id} />
    </>
  );
}
