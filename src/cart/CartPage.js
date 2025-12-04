import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hostname } from "../settings";

const CartItem = ({ item, updateCount, removeFromCart }) => {
  const [count, setCount] = useState(item.quantity);
  const [productData, setProductData] = useState(item.product);

  useEffect(() => {
    setCount(item.quantity);
  }, [item.quantity]);

  const handleUpdate = () => {
    if (count > 0) {
      updateCount(item._id, count);
    }
  };

  useEffect(() => {
    // If item.product is just an ID string, fetch the details
    if (typeof item.product === "string") {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            `${hostname}/api/v1/products/${item.product}`
          );
          setProductData(response.data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    } else {
      // If it's already an object, use it directly
      setProductData(item.product);
    }
  }, [item.product]);

  if (!productData) {
    return null; // or a loading spinner
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: "16px",
        border: "1px solid #f0f0f0",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: "auto" },
          flexGrow: 1,
        }}
      >
        {/* Image */}
        <img
          src={productData.imageCoverUrl || productData.imageCover}
          alt={productData.title}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "8px",
            objectFit: "cover",
            marginRight: "16px",
          }}
        />

        {/* Details */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {productData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {productData.brand?.name || productData.brand || "Brand"}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            {item.price} $
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: { xs: 2, sm: 0 },
          gap: 2,
        }}
      >
        {/* Quantity */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1, fontWeight: "bold" }}>Quantity:</Typography>
          <TextField
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            sx={{ width: "70px", mr: 1 }}
            size="small"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              minWidth: "40px",
              height: "40px",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={handleUpdate}
          >
            Apply
          </Button>
        </Box>

        {/* Remove */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => removeFromCart(item._id)} color="default">
            <DeleteIcon />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            Remove
          </Typography>
        </Box>

        {/* Total Price for Item (from image: 200 $) */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}
        >
          {item.price * item.quantity} $
        </Typography>
      </Box>
    </Paper>
  );
};

export default function CartPage() {
  const {
    cart,
    fetchCart,
    removeFromCart,
    updateCount,
    clearCart,
    applyCoupon,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Your Cart is Empty
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ bgcolor: "black" }}
          >
            Go Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  const handleApplyCoupon = async () => {
    if (couponCode) {
      await applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, textAlign: "right" }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Section (Left) */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: "16px", border: "1px solid #f0f0f0" }}
          >
            <Box sx={{ display: "flex", mb: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "4px 0 0 4px",
                  "&:hover": { backgroundColor: "#333" },
                }}
                disableElevation
                onClick={handleApplyCoupon}
              >
                Apply
              </Button>
              <TextField
                fullWidth
                placeholder="Coupon Code"
                variant="outlined"
                size="small"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0 4px 4px 0",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                mt: 4,
                border: "1px solid #eee",
                p: 2,
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {cart.totalCartPrice} $
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Price
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 2,
                backgroundColor: "black",
                color: "white",
                py: 1.5,
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={clearCart}
              sx={{
                borderColor: "black",
                color: "black",
                "&:hover": { backgroundColor: "#f5f5f5", borderColor: "black" },
              }}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>

        {/* Items Section (Right) */}
        <Grid item xs={12} md={8}>
          {cart.cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              updateCount={updateCount}
              removeFromCart={removeFromCart}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
