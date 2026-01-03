import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import CategoriesNavbar from "../categories/CategoriesNavbar";
import React, { useMemo, useContext } from "react";
import { checkCurrentPath } from "../utilities/functions";
import ProductCard from "../prodcuts/ProductCard";
import { Typography, Box } from "@mui/material";
import { ProductsContext } from "../contexts/ProductsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";

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
      return null;
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
            <li
              className="renderCategories"
              style={{ flexShrink: 0, minWidth: "fit-content" }}
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
            className="renderCategories"
            style={{ flexShrink: 0, minWidth: "fit-content" }}
          >
            <CategoriesNavbar
              name={category.name}
              link={`/categories/${category.slug}`}
              image={category.image}
            />
          </li>
        ))}
      </>
    );
  };

  const showAllProductsByMostSold = () => {
    navigate("/most-sold-products");
  };

  return (
    <div className="HomePage">
      {/* categories */}
      {!checkCurrentPath("/all-categories", location.pathname) && (
        <div
          style={{
            fontSize: "30px",
            paddingTop: "10px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="h4"
          >
            Categories
          </Typography>

          <Box
            component="ul"
            className={`Categories ${isHome ? "is-home" : ""}`}
            sx={{
              display: "flex",
              overflowX: { xs: "auto", md: "visible" },
              flexWrap: { xs: "nowrap", md: "wrap" },
              justifyContent: { xs: "flex-start", md: "center" },
              width: "100%",
              padding: 2,
              margin: 0,
              listStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              gap: 2,
            }}
          >
            {typeof renderCategories === "function" ? renderCategories() : null}
          </Box>
        </div>
      )}
      {/* categories */}

      {/* Most Sold */}

      <Typography
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 2,
        }}
        variant="h4"
      >
        Most Sold
      </Typography>

      <div className="MostSoldHomePageContainer">
        <button
          className="showMoreButton"
          onClick={() => showAllProductsByMostSold()}
        >
          Show More
        </button>
        <div className="MostSoldHomePage">
          <ProductCard sortedProducts={topFourMostSoldProducts} />
        </div>
      </div>

      {/* Most Sold */}
    </div>
  );
}

export default HomePage;
