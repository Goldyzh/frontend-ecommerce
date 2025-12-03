import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import AllCategories from "./categories/AllCategories";
import Container from "@mui/material/Container";
import React, { useContext } from "react";
import { renderProductRoute } from "./prodcuts/ProductCard";
import AllProducts from "./prodcuts/AllProducts";
import { ProductsContext } from "./contexts/ProductsContext";
import { renderCategoriesRoute } from "./categories/CategoryPage";
import { CategoriesContext } from "./contexts/CategoriesContext";

function App() {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Routes>
          <Route path="/hello" element={<Hello />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route
            path="/all-products"
            element={<AllProducts products={products} />}
          />
          <Route path="*" element={<NotFound />} />
          {renderCategoriesRoute(categories)}
          {renderProductRoute(products)}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
