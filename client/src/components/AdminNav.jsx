import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/adminNav.css";
import { useAuth } from "../context/AuthContext";

const AdminNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="admin-nav">
      <button onClick={() => navigate("/admin")} className="admin-nav-btn">👥 Users</button>
      <button onClick={() => navigate("/admin-products")} className="admin-nav-btn">📦 Products</button>
      <button onClick={() => navigate("/admin-categories")} className="admin-nav-btn">📂 Categories</button>
      <button onClick={() => navigate("/admin-orders")} className="admin-nav-btn">🚚 Orders</button>
      <button onClick={() => navigate("/store")} className="admin-nav-btn">🏠 Home</button>
      <button onClick={logout} className="admin-nav-btn logout">
        Logout
      </button>
    </div>
  );
};

export default AdminNav;
