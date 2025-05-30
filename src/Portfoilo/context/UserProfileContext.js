import React, { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setEmail] = useState("");
  const [token, setToken] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("jwtToken");
      setToken(token);

      if (!token) throw new Error("No token found");

      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.status == 401) {
        navigate("/login");
      }
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setEmail(data[0]?.email);
      setUser(data[0]?.name || "Unknown User");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ user, userEmail, loading, error, token }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
