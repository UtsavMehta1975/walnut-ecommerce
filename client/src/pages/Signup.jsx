import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import "../styles/auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      const { token } = response.data;
      localStorage.setItem("jwt", token);
      toast.success("Signup successful");
      navigate("/store");
    } catch (err) {
      const message = err.response?.data?.error || "Signup failed";
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
            <p className="auth-subtitle">Join the world of premium timepieces</p>
          </div>
          
          <form onSubmit={handleSignup} className="auth-form">
            <h2 className="form-title">Create Account</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Create Account
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
    </Layout>
  );
}

export default Signup;
