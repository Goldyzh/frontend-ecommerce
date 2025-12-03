import { createContext, useState, useEffect } from "react";
import { hostname } from "../settings";
import axios from "axios";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${hostname}/api/v1/users/getMe`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
