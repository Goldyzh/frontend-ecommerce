import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>
          Go Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {cart.cartItems.map((item) => (
              <React.Fragment key={item._id}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2, mt: 1 }}
                >
                  <Grid item xs={3} sm={2}>
                    <img
                      src={item.product.imageCoverUrl}
                      alt={item.product.title}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} sm={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        width: "fit-content",
                      }}
                    >
                      <IconButton size="small">
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton size="small">
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3} sx={{ textAlign: "right" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      ${item.price * item.quantity}
                    </Typography>
                    <IconButton color="error" sx={{ mt: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </React.Fragment>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Total Price:</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ${cart.totalCartPrice}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2, py: 1.5 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
