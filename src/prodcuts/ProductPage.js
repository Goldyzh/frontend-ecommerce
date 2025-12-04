import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Rating,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

export default function ProductPage({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    await addToCart(product._id);
    alert("Product added to cart");
  };

  console.log(product);
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          {/* Product Image will go here */}
          <Box
            component="img"
            src={product.imageCoverUrl}
            alt={product.title}
            sx={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Brand: {product.brand}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Quantity Available: {product.quantity}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Description:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 3 }}>
            Price: {product.price} $
          </Typography>
          <Button
            onClick={() => handleAddToCart(product._id)}
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Reviews ({product.ratingsQuantity})
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating
            name="product-rating"
            value={product.ratingsAverage}
            precision={0.5}
            readOnly
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.ratingsAverage} out of 5)
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Leave a review:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Write your comment.."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          Add Comment
        </Button>
      </Box>
    </Container>
  );
}
