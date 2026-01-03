import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../contexts/ProductsContext";
import { useContext } from "react";

function MostSoldProducts() {
  const { products } = useContext(ProductsContext);

  const MostSoldProductsList = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);
    return sortedProducts;
  }, [products]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Most Sold Products
      </Typography>
      <ProductCard sortedProducts={MostSoldProductsList} fixedSize={true} />
    </Container>
  );
}
export default MostSoldProducts;
