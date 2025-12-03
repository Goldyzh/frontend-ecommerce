import "./App.css";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import AllCategories from "./categories/AllCategories";
import Container from "@mui/material/Container";
import React, { useContext } from "react";
import { renderProductRoute } from "./prodcuts/ProductCard";
import { ProductsContext } from "./contexts/ProductsContext";
import { renderCategoriesRoute } from "./categories/CategoryPage";
import { CategoriesContext } from "./contexts/CategoriesContext";
import PrimarySearchAppBar from "./Navbar";
import MostSoldProducts from "./prodcuts/MostSoldProducts";
import SearchResults from "./prodcuts/SearchResults";

function App() {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="App">
      {/* Navbar */}
      <PrimarySearchAppBar />
      {/* Navbar */}
      {/* HomePage */}
      <Container className="HomePage" maxWidth="xl">
        {/* Routes */}
        <Routes>
          <Route path="/hello" element={<Hello />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/most-sold-products" element={<MostSoldProducts />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
          {renderCategoriesRoute(categories)}
          {renderProductRoute(products)}
        </Routes>
        {/* Routes */}
      </Container>
      {/* HomePage */}
    </div>
  );
}

export default App;
