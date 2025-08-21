import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import dayjs from "dayjs";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import "../styles/myOrders.css";

const statusColors = {
  pending: "status-pending",
  processing: "status-processing",
  shipped: "status-shipped",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
};

// Helper to calculate estimated delivery
const getEstimatedDelivery = (status, createdAt) => {
  const baseDate = dayjs(createdAt);
  switch (status) {
    case "processing":
      return baseDate.add(5, "day").format("DD MMM YYYY");
    case "shipped":
      return baseDate.add(3, "day").format("DD MMM YYYY");
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "Pending dispatch";
  }
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">📦 My Orders</h1>
          <p className="orders-subtitle">Track your timepiece orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">🕐</div>
            <h3>No orders yet</h3>
            <p>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3 className="order-number">Order #{order.id}</h3>
                  <span className={`status-badge ${statusColors[order.status] || "status-default"}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="order-details">
                  <p className="order-date">
                    Placed on: {dayjs(order.createdAt).format("DD MMM YYYY, h:mm A")}
                  </p>
                  <p className="order-total">Total: ₹{order.totalAmount.toFixed(2)}</p>
                  <p className="order-delivery">
                    <strong>Estimated Delivery:</strong>{" "}
                    {getEstimatedDelivery(order.status, order.createdAt)}
                  </p>
                </div>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul className="items-list">
                    {order.OrderItems.map((item) => (
                      <li key={item.id} className="item">
                        <span className="item-name">{item.Product.name}</span>
                        <span className="item-details">
                          × {item.quantity} @ ₹{item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
