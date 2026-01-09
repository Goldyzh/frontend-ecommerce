import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { hostname } from "./settings";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { UserContext } from "./contexts/UserContext";
import { useContext, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function PrimarySearchAppBar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  let isLoggedIn = user !== null ? true : false;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAnchorEl(null);
    navigate("/login");
  };

  const searchProducts = (query) => {
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;

    const hasPotentialXSS = /<\s*script|on\w+\s*=|javascript:/i.test(query);
    if (hasPotentialXSS) {
      return;
    }

    setSearchQuery(query);

    if (query.length > 0) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await axios.get(
            `${hostname}/api/v1/products?keyword=${encodeURIComponent(query)}`
          );
          setSuggestions(response.data.data.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    navigate(`/products/${suggestion.slug}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProducts(searchQuery);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ cursor: "pointer" }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, cursor: "pointer" }}
          ></IconButton>

          {/* Cart */}
          <IconButton
            onClick={() => navigate("/cart")}
            style={{ color: "white" }}
          >
            <Typography variant="h6">Cart</Typography>
            <ShoppingCartIcon />
          </IconButton>
          {/* Cart */}

          {/* Login */}
          {isLoggedIn ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {user.name}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <IconButton style={{ color: "white", paddingRight: "20px" }}>
                <Typography variant="h6">Login</Typography>
                <AccountCircleIcon />
              </IconButton>
            </Link>
          )}
          {/* Login */}

          <Search sx={{ flexGrow: 250, marginLeft: "", cursor: "pointer" }}>
            <SearchIconWrapper onClick={() => searchProducts(searchQuery)}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  mt: 1,
                }}
              >
                <List>
                  {suggestions.map((suggestion) => (
                    <ListItem key={suggestion._id} disablePadding>
                      <ListItemButton
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <ListItemText primary={suggestion.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>
          </Box>
          {/* home */}
          <Link to="/home" style={{ paddingRight: "20px" }}>
            <IconButton>
              <HomeIcon style={{ color: "white" }} />
            </IconButton>
          </Link>
          {/* home */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
