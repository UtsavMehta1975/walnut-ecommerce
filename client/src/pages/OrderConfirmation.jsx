import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/orderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <Layout>
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">🎉</div>
          <h1 className="confirmation-title">Order Confirmed!</h1>
          {orderId ? (
            <p className="confirmation-message">
              Your order ID is <span className="order-id">{orderId}</span>
            </p>
          ) : (
            <p className="confirmation-message">Thank you for your order!</p>
          )}
          <p className="confirmation-subtitle">
            We'll send you updates about your order status via email.
          </p>
          
          <div className="confirmation-actions">
            <button
              onClick={() => navigate("/my-orders")}
              className="view-orders-btn"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/store")}
              className="continue-shopping-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
