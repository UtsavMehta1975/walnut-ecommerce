import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/accessDenied.css";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false} showFooter={false} showNav={false}>
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="error-icon">🚫</div>
          <h1 className="error-title">Access Denied</h1>
          <p className="error-message">
            You don't have permission to access this page.
          </p>
          <p className="error-subtitle">
            Please contact an administrator if you believe this is an error.
          </p>
          
          <div className="error-actions">
            <button
              onClick={() => navigate("/store")}
              className="go-home-btn"
            >
              Go to Store
            </button>
            <button
              onClick={() => navigate("/login")}
              className="login-btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccessDenied;
