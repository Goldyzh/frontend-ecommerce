import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { hostname } from "../settings";
import validator from 'validator';

function SearchResults() {
  const { searchResults, setSearchResults } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const cleanQuery = validator.escape(query);
         

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          
          const response = await axios.get(
            `${hostname}/api/v1/products?keyword=${cleanQuery}`
          );
          setSearchResults(response.data.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };
    fetchSearchResults();
  }, [query, cleanQuery, setSearchResults]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Search Results {cleanQuery && `for "${cleanQuery}"`}
      </Typography>
      <ProductCard sortedProducts={searchResults} />
    </Container>
  );
}

export default SearchResults;
