import {
  Typography,
  Paper,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function CartCard({
  item,
  productData,
  count,
  setCount,
  handleUpdate,
  removeFromCart,
}) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${productData.slug}`);
  };

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
          cursor: "pointer",
        }}
        onClick={handleProductClick}
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
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "space-between", sm: "flex-end" },
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Quantity */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              mr: 1,
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Quantity:
          </Typography>
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

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}
        >
          {item.price * item.quantity} $
        </Typography>
      </Box>
    </Paper>
  );
}
