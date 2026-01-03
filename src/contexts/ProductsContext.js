import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { hostname } from "../settings";

export const ProductsContext = createContext({});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${hostname}/api/v1/products`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, searchResults, setSearchResults }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
