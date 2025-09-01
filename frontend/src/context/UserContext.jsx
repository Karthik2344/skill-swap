import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // ✅ use your axios instance

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get("/users/profile");
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);
