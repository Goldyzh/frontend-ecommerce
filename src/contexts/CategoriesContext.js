import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { hostname } from "../settings";

export const CategoriesContext = createContext({});

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${hostname}/api/v1/Categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}
