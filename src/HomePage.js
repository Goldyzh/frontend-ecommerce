import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
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
          <Typography style={{ marginLeft: "170px" }} variant="h4">
            Categories
          </Typography>

          <ul className={`Categories ${isHome ? "is-home" : ""}`} style={{}}>
            {typeof renderCategories === "function" ? renderCategories() : null}
          </ul>
        </div>
      )}
      {/* categories */}

      {/* Most Sold */}

      <div className="MostSoldHomePage">
        <button
          className="showMoreButton"
          onClick={() => showAllProductsByMostSold(products)}
        >
          Show More
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "30px",
            width: "100%",
          }}
        >
          <Typography style={{ marginRight: "90px" }} variant="h4">
            Most Sold
          </Typography>

          <ProductCard sortedProducts={topFourMostSoldProducts} />
        </div>
      </div>

      {/* Most Sold */}
    </div>
  );
}

export default HomePage;
