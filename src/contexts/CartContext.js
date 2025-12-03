import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { hostname } from "../settings";
import { UserContext } from "./UserContext";

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user } = useContext(UserContext);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart(null);
      return;
    }
    try {
      const response = await axios.get(`${hostname}/api/v1/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      // If 404, likely cart doesn't exist yet, can treat as empty or null
      if (error.response && error.response.status === 404) {
        setCart({ cartItems: [], totalCartPrice: 0 });
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
