import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
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

export default function Signup() {
  const [userSignupData, setUserSignupData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validate = () => {
    const newErrors = {};
    if (!userSignupData.name) {
      newErrors.name = "Name is required";
    }
    if (!userSignupData.email) {
      newErrors.email = "Email is required";
    }
    if (!userSignupData.password) {
      newErrors.password = "Password is required";
    }
    if (!userSignupData.passwordConfirm) {
      newErrors.passwordConfirm = "Confirm Password is required";
    }
    if (
      userSignupData.password &&
      userSignupData.passwordConfirm &&
      userSignupData.password !== userSignupData.passwordConfirm
    ) {
      newErrors.passwordConfirm = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post(`${hostname}/api/v1/auth/signup`, {
        name: userSignupData.name,
        email: userSignupData.email,
        password: userSignupData.password,
        passwordConfirm: userSignupData.passwordConfirm,
      });
      localStorage.setItem("token", response.data.token);
      const userData = response.data.data;
      const { password, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      navigate("/home");
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed");
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
              padding: 10,
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
              Create an Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    value={userSignupData.name}
                    onChange={(e) =>
                      setUserSignupData({
                        ...userSignupData,
                        name: e.target.value,
                      })
                    }
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={userSignupData.email}
                    onChange={(e) =>
                      setUserSignupData({
                        ...userSignupData,
                        email: e.target.value,
                      })
                    }
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userSignupData.password}
                    onChange={(e) =>
                      setUserSignupData({
                        ...userSignupData,
                        password: e.target.value,
                      })
                    }
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    value={userSignupData.passwordConfirm}
                    onChange={(e) =>
                      setUserSignupData({
                        ...userSignupData,
                        passwordConfirm: e.target.value,
                      })
                    }
                    variant="outlined"
                    error={!!errors.passwordConfirm}
                    helperText={errors.passwordConfirm}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Already have an account? Sign in
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
