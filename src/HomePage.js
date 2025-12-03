import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "./Navbar";
import CategoriesNavbar from "./categories/CategoriesNavbar";
import React, { useMemo, useContext } from "react";
import { checkCurrentPath } from "./utilities/functions";
import ProductCard from "./prodcuts/ProductCard";
import { Typography } from "@mui/material";
import { ProductsContext } from "./contexts/ProductsContext";
import { CategoriesContext } from "./contexts/CategoriesContext";

function HomePage() {
  const { categories } = useContext(CategoriesContext);

  const [isHome, setIsHome] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsHome(
      checkCurrentPath("/", location.pathname) ||
        checkCurrentPath("/home", location.pathname)
    );
  }, [location.pathname]);

  const { products } = useContext(ProductsContext);

  const topFourMostSoldProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }
    const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);
    return sortedProducts.slice(0, 4);
  }, [products]);

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

  const showAllProductsByMostSold = (products) => {
    navigate("/all-products");
    // AllProducts(products);  // This line is no longer needed
  };

  return (
    <div className="HomePage">
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
            paddingRight: "50px",
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

            <ProductCard sortedProducts={topFourMostSoldProducts} />
          </div>
        </div>
      ) : null}

      {/* Most Sold */}
    </div>
  );
}

export default HomePage;
