import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Check token and fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("jwt");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Backend login request
  const handleLogin = async (identifier, password) => {
    try {
      const payload = identifier.includes("@")
        ? { email: identifier, password }
        : { username: identifier, password };

      const res = await axios.post("/auth/login", payload);
      const { token, user } = res.data;
      storeSession(token, user);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  // ✅ Store session and redirect
  const storeSession = (token, user) => {
    localStorage.setItem("jwt", token);
    setUser(user);
    toast.success("Login successful");

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/store");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
