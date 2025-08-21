import { useEffect, useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import AdminNav from "../components/AdminNav";
import "../styles/admin.css";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateStatus = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;

    try {
      await axios.put(`/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      toast.success(`Order ${orderId} updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      console.error("❌ Status update failed:", err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">All Orders 📦</h2>
      <AdminNav />

      <table className="admin-table">
        <thead>
          <tr className="admin-table-header">
            <th>Order ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.status}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <ul>
                  {order.OrderItems.map((item) => (
                    <li key={item.id}>
                      {item.Product?.name} × {item.quantity} @ ₹{item.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <select
                  value={statusUpdates[order.id] || order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="admin-select"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  className="admin-button"
                  disabled={statusUpdates[order.id] === order.status}
                  onClick={() => updateStatus(order.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
