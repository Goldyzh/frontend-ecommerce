import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";

export default function ProductCart({ categoryId }) {
  const [products, setproducts] = useState([]);

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
      <Grid item key={product._id} xs={1} sm={2} md={3} lg={4}>
        <Card sx={{ width: 320, height: 400 }}>
          <CardMedia
            component="img"
            height="194"
            image={product.imageCoverUrl}
            alt="Paella dish"
          />
          <CardContent>
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
          <CardActions disableSpacing></CardActions>
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
