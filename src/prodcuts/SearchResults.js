import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function SearchResults() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <ProductCard />
    </Container>
  );
}

export default SearchResults;
