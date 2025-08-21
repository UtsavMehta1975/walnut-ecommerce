import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import "../styles/auth.css";

function Login() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(identifier, password); // ✅ clean call
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <Layout showHeader={false} showFooter={false} showNav={false}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">⏰ Walnut</h1>
            <p className="auth-subtitle">Welcome back to premium timepieces</p>
          </div>
          
          <form onSubmit={handleLogin} className="auth-form">
            <h2 className="form-title">Login</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <input
                type="text"
                placeholder="Email or Username"
                className="form-input"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>

            <p className="auth-link">
              Don't have an account?{" "}
              <a href="/signup" className="link-text">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
