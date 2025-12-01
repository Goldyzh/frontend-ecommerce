import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import Hello from "./Hello";
import Home from "./Home";
import NotFound from "./NotFound";
import PrimarySearchAppBar from "./Navbar";
import CategoriesNavbar from "./CategoriesNavbar";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import Category from "./Category";

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

function currentPathIsHome(link, currentPath) {
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
      currentPathIsHome("/", location.pathname) ||
        currentPathIsHome("/home", location.pathname)
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
    return categories.map((category) => (
      <li key={category._id}>
        <CategoriesNavbar
          name={category.name}
          link={`/categories/${category.slug}`}
          image={category.image}
        />
      </li>
    ));
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
        element={<Category category={category} />}
      />
    ));
  };

  return (
    <div className="App">
      {/* navbar */}
      <PrimarySearchAppBar />
      {/* navbar */}
      {/* ROUTES */}
      <div style={{ fontSize: "30px" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-end",
            listStyle: "none",
            padding: 0,
            marginTop: 0,
            backgroundColor: !isHome
              ? "rgba(255, 255, 255, 0.5)"
              : "transparent",
            paddingRight: "10%",
          }}
        >
          {renderCategories()}
        </ul>
      </div>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/hello" element={<Hello />} />

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="*" element={<NotFound />} />
          {renderRoute()}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
