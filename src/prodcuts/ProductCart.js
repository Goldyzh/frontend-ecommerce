import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import ProductPage from "./ProductPage";
import { Route, useNavigate } from "react-router-dom";

export const renderProductRoute = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return null; // Or a loading indicator, or a message
  }
  return products.map((product) => (
    <Route
      key={product._id}
      path={`/products/${product.slug}`}
      element={<ProductPage product={product} />}
    />
  ));
};

export default function ProductCart({ categoryId }) {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const openProductPage = (product) => {
    navigate(`/products/${product.slug}`);
  };

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products?category=${categoryId}`
        );
        setproducts(response.data.data);

        // console.log(products.data.data[0].name);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchproducts();
  }, [categoryId]);

  console.log(products[0]);

  const renderProducts = () => {
    if (!Array.isArray(products) || products.length === 0) {
      return null; // Or a loading indicator, or a message
    }
    return products.map((product) => (
      <Grid key={product._id} sm={4} md={3} lg={3}>
        <Card sx={{ width: 320, height: 400 }}>
          <CardActionArea onClick={() => openProductPage(product)}>
            <CardMedia
              component="img"
              height="194"
              image={product.imageCoverUrl}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.title}
              </Typography>
              <div
                style={{
                  jsutifyConetent: "center",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "end",
                }}
              >
                <Typography variant="body5" sx={{ color: "gold" }}>
                  {product.ratingsAverage}
                </Typography>
                <StarIcon style={{ color: "gold" }} />
              </div>
              <Typography
                variant="body5"
                sx={{ display: "flex", marginTop: 0, paddingLeft: "5px" }}
              >
                {`${product.price}$`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              sx={{
                jsutifyConetent: "center",
                display: "flex",
                fill: "none",
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={4}>
      {renderProducts()}
    </Grid>
  );
}
