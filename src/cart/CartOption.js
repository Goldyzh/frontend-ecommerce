import { Grid, Paper, Box, Button, Typography, TextField } from "@mui/material";

export default function CartOption({
  cart,
  handleApplyCoupon,
  clearCart,
  couponCode,
  setCouponCode,
}) {
  return (
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
  );
}
