import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import Hello from "./Hello";
import Home from "./Home";
import NotFound from "./NotFound";
import AllCategories from "./categories/AllCategories";
import PrimarySearchAppBar from "./Navbar";
import CategoriesNavbar from "./categories/CategoriesNavbar";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import CategoryPage from "./categories/CategoryPage";
import { Typography } from "@mui/material";

// async function getCategories() {
//   console.log("clicked");
//   try {
//     const response = await axios.get("http://localhost:8000/api/v1/categories");
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCategories();

function currentPath(link, currentPath) {
  if (currentPath === link) {
    return true;
  } else {
    return false;
  }
}

function App() {
  const [categories, setCategories] = useState([]);

  const [isHome, setIsHome] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsHome(
      currentPath("/", location.pathname) ||
        currentPath("/home", location.pathname)
    );
  }, [location.pathname]);

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
    const categoriesToDisplay = currentPath(
      "/all-categories",
      location.pathname
    )
      ? categories
      : categories.slice(0, 5);
    return (
      <>
        {!currentPath("/all-categories", location.pathname) &&
          categories.length > 5 && (
            <li
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CategoriesNavbar
                name="Show More"
                link="/all-categories"
                image={null}
              />
            </li>
          )}
        {categoriesToDisplay.map((category) => (
          <li
            key={category._id}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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

  console.log(categories);

  const renderRoute = () => {
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

  return (
    <div className="App">
      {/* navbar */}
      <PrimarySearchAppBar />
      {/* navbar */}

      {/* categories */}
      {!currentPath("/all-categories", location.pathname) && (
        <div
          style={{
            fontSize: "30px",
            paddingTop: "10px",
          }}
        >
          <ul
            style={{
              display: "flex",
              justifyContent: "flex-end",
              listStyle: "none",
              marginTop: 0,
              backgroundColor: !isHome
                ? "rgba(255, 255, 255, 0.5)"
                : "transparent",
              paddingRight: "200px",
              gap: isHome ? "8%" : "1%",
              height: "fit-content",
            }}
          >
            {renderCategories()}
          </ul>
        </div>
      )}
      {/* categories */}

      {/* ROUTES */}
      <Container maxWidth="xl">
        <Routes>
          <Route path="/hello" element={<Hello />} />

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/all-categories" element={<AllCategories />} />

          <Route path="*" element={<NotFound />} />
          {renderRoute()}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
