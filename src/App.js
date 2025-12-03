import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home-screen/HomePage";
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
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CartPage from "./cart/CartPage";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/most-sold-products" element={<MostSoldProducts />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<CartPage />} />
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
