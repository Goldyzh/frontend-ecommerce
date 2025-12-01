import * as React from "react";

import ProductCart from "./ProductCart";

export default function productPage({ product }) {
  return (
    <>
      <h1>{product.name} product </h1>
      <ProductCart productId={product._id} />
    </>
  );
}
