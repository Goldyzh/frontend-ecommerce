import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { hostname } from "../settings";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${hostname}/api/v1/auth/login`, {
        email,
        password,
      });
      //   console.log(response.data);
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("user", JSON.stringify(response.data.data.user));
      const userData = response.data.data;
      setUser({
        name: userData.name,
        email: userData.email,
        wishlist: userData.wishlist,
        _id: userData._id,
      });
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
