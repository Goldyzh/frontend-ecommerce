import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Hello from "./Hello";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import AllCategories from "./categories/AllCategories";
import PrimarySearchAppBar from "./Navbar";
import CategoriesNavbar from "./categories/CategoriesNavbar";
import Container from "@mui/material/Container";
import React, { useState, useEffect, useMemo } from "react";
import CategoryPage from "./categories/CategoryPage";
import { renderProductRoute } from "./prodcuts/ProductCart";
import { checkCurrentPath } from "./utilities/functions";
import ProductCart from "./prodcuts/ProductCart";
import { Typography } from "@mui/material";
import AllProducts from "./prodcuts/AllProducts";

function App() {
  const [categories, setCategories] = useState([]);

  const [isHome, setIsHome] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsHome(
      checkCurrentPath("/", location.pathname) ||
        checkCurrentPath("/home", location.pathname)
    );
  }, [location.pathname]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/products"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const topFourMostSoldProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);
    return sortedProducts.slice(0, 4);
  }, [products]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/categories"
        );
        setCategories(response.data.data);

        // console.log(categories.data.data[0].name);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // console.log(categories[0]);

  const renderCategories = () => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return null; // Or a loading indicator, or a message
    }
    const categoriesToDisplay = checkCurrentPath(
      "/all-categories",
      location.pathname
    )
      ? categories
      : categories.slice(0, 5);
    return (
      <>
        {!checkCurrentPath("/all-categories", location.pathname) &&
          categories.length > 5 && (
            <li className="renderCategories">
              <CategoriesNavbar
                name="Show More"
                link="/all-categories"
                image={null}
              />
            </li>
          )}
        {categoriesToDisplay.map((category) => (
          <li key={category._id} className="renderCategories">
            <CategoriesNavbar
              name={category.name}
              link={`/categories/${category.slug}`}
              image={isHome ? category.image : null}
            />
          </li>
        ))}
      </>
    );
  };

  const renderCategoriesRoute = () => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return null; // Or a loading indicator, or a message
    }
    return categories.map((category) => (
      <Route
        key={category._id}
        path={`/categories/${category.slug}`}
        element={<CategoryPage category={category} />}
      />
    ));
  };

  const showAllProductsByMostSold = (products) => {
    navigate("/all-products");
    // AllProducts(products);  // This line is no longer needed
  };

  return (
    <div className="App">
      {/* Navbar */}
      <PrimarySearchAppBar />
      {/* Navbar */}
      {/* categories */}
      {!checkCurrentPath("/all-categories", location.pathname) && (
        <div
          style={{
            fontSize: "30px",
            paddingTop: "10px",
          }}
        >
          <Typography style={{ marginLeft: "300px" }} variant="h4">
            Categories
          </Typography>

          <ul className={`Categories ${isHome ? "is-home" : ""}`} style={{}}>
            {typeof renderCategories === "function" ? renderCategories() : null}
          </ul>
        </div>
      )}
      {/* categories */}

      {/* Most Sold */}
      {isHome ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "start",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "gray",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "30px",
              margin: "3%",
            }}
            onClick={() => showAllProductsByMostSold(products)}
          >
            Show More
          </button>
          <div
            className="renderCategories"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingLeft: "50px",
            }}
          >
            <Typography variant="h4">Most Sold</Typography>

            <ProductCart sortedProducts={topFourMostSoldProducts} />
          </div>
        </div>
      ) : null}

      {/* Most Sold */}

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
          {renderCategoriesRoute()}
          {renderProductRoute(products)}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
