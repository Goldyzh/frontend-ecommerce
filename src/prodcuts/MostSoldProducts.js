import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { useMemo } from "react";
import ProductCard from "./ProductCard";

function MostSoldProducts({ products }) {
  const MostSoldProductsList = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);
    return sortedProducts;
  }, [products]);

  console.log(MostSoldProductsList);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        All prodcuts
      </Typography>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
        }}
      >
        <li>
          <ProductCard sortedProducts={MostSoldProductsList} />
        </li>
      </ul>
    </Container>
  );
}
export default MostSoldProducts;
