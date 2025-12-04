import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Container, Typography, Grid } from "@mui/material";
import axios from "axios";
import { hostname } from "../settings";
import CartCard from "./CartCard";
import IsCartEmpty from "./IsCartEmpty";
import CartOption from "./CartOption";

const CartItem = ({ item, updateCount, removeFromCart }) => {
  const [count, setCount] = useState(item.quantity);
  const [productData, setProductData] = useState(item.product);

  useEffect(() => {
    setCount(item.quantity);
  }, [item.quantity]);

  const handleUpdate = () => {
    console.log("handleUpdate called with count:", count, "item:", item);
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
    <CartCard
      item={item}
      productData={productData}
      count={count}
      setCount={setCount}
      handleUpdate={handleUpdate}
      removeFromCart={removeFromCart}
    />
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
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return <IsCartEmpty />;
  }

  const handleApplyCoupon = async () => {
    if (couponCode) {
      await applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Your Shopping Cart Typography*/}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, textAlign: "right" }}
      >
        Your Shopping Cart
      </Typography>
      {/* Your Shopping Cart Typography*/}

      <div style={{ flexDirection: "row", display: "flex", gap: "20px" }}>
        {/* Cart Option */}
        <CartOption
          cart={cart}
          handleApplyCoupon={handleApplyCoupon}
          clearCart={clearCart}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
        />
        {/* Cart Option */}
        {/* Cart Items */}
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
        {/* Cart Items */}
      </div>
    </Container>
  );
}
