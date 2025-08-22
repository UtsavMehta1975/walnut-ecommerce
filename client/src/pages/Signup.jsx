import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { signup, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Show message if redirected from product page
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign up the user
      await signup(formData);
      
      // Auto-login after successful signup
      try {
        await login({
          email: formData.email,
          password: formData.password
        });
        
        // Redirect to returnTo URL if available, otherwise to store
        const returnTo = location.state?.returnTo || "/store";
        navigate(returnTo, { replace: true });
        toast.success("Welcome to Walnut! You're now logged in.");
      } catch (loginErr) {
        // If auto-login fails, redirect to login page
        navigate("/login", { 
          state: { 
            message: "Account created successfully! Please login.",
            returnTo: location.state?.returnTo
          }
        });
      }
    } catch (err) {
      const message = err.response?.data?.error || "Signup failed";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">⏰ Walnut</h1>
          <p className="auth-subtitle">Join the premium timepiece community</p>
        </div>
        
        <form onSubmit={handleSignup} className="auth-form">
          <h2 className="form-title">Sign Up</h2>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>

          <p className="auth-link">
            Already have an account?{" "}
            <a href="/login" className="link-text">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
