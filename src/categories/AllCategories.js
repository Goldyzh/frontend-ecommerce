import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import CategoriesNavbar from "./CategoriesNavbar";

function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        All Categories
      </Typography>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
        }}
      >
        {categories.map((category) => (
          <li key={category._id} style={{ margin: "10px" }}>
            <CategoriesNavbar
              name={category.name}
              link={`/categories/${category.slug}`}
              image={category.image}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default AllCategories;
