import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IsCartEmpty() {
  const navigate = useNavigate();
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
