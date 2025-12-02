import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function AllProducts({ products }) {
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
        {products.map((product) => (
          <li key={product._id} style={{ margin: "10px" }}>
            <ProductCard sortedProducts={product} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default AllProducts;
