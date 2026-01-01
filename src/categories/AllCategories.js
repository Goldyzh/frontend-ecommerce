import React, { useContext } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import CategoriesNavbar from "./CategoriesNavbar";
import { CategoriesContext } from "../contexts/CategoriesContext";

function AllCategories() {
  const { categories } = useContext(CategoriesContext);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        All Categories
      </Typography>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          justifyContent: "center",
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
