import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { hostname } from "../settings";
import { UserContext } from "./UserContext";

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user } = useContext(UserContext);

  const fetchCart = useCallback(async () => {
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
      if (error.response && error.response.status === 404) {
        setCart({ cartItems: [] });
      }
    }
  }, []);

  const removeFromCart = useCallback(async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${hostname}/api/v1/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, []);

  const updateCount = useCallback(async (itemId, count) => {
    const token = localStorage.getItem("token");
    console.log("updateCount called for itemId:", itemId, "count:", count);
    try {
      const response = await axios.put(
        `${hostname}/api/v1/cart/${itemId}`,
        { quantity: count },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("updateCount response:", response.data);
      setCart(response.data.data);
    } catch (error) {
      console.error("Error updating count:", error);
    }
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${hostname}/api/v1/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({ cartItems: [], totalCartPrice: 0 });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }, []);

  const applyCoupon = useCallback(async (coupon) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${hostname}/api/v1/cart/applyCoupon`,
        { coupon },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.data);
      return true;
    } catch (error) {
      console.error("Error applying coupon:", error);
      return false;
    }
  }, []);

  const addToCart = useCallback(async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${hostname}/api/v1/cart`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data.data);
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  }, []);

  console.log("cart: ", cart);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        removeFromCart,
        updateCount,
        clearCart,
        applyCoupon,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
