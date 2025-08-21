import { useEffect, useState } from "react";

import axios from "../utils/axios";
import toast from "react-hot-toast";
import "../styles/admin.css";
import AdminNav from "../components/AdminNav"; // ✅ Reusable nav

function Admin() {
 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      const enriched = res.data.map((u) => ({
        ...u,
        editing: false,
        name: u.name || "",
        email: u.email || "",
        role: u.role || "user"
      }));
      setUsers(enriched);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/users/${id}`);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const startEdit = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, editing: true } : u))
    );
  };

  const cancelEdit = () => {
    fetchUsers();
  };

  const handleSave = async (id) => {
    const user = users.find((u) => u.id === id);
    try {
      await axios.put(`/users/${id}`, {
        name: user.name,
        role: user.role,
      });
      toast.success("User updated");
      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading users...</div>;

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel 🛠️</h2>

      {/* 🔗 Reusable Admin Navigation */}
      <AdminNav />

      <div className="admin-search">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="admin-search-input"
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr className="admin-table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {u.editing ? (
                  <input
                    type="text"
                    value={u.name}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((user) =>
                          user.id === u.id
                            ? { ...user, name: e.target.value }
                            : user
                        )
                      )
                    }
                    className="admin-input"
                  />
                ) : (
                  u.name || "—"
                )}
              </td>
              <td>{u.email || "—"}</td>
              <td>
                {u.editing ? (
                  <select
                    value={u.role}
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((user) =>
                          user.id === u.id
                            ? { ...user, role: e.target.value }
                            : user
                        )
                      )
                    }
                    className="admin-select"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  u.role || "—"
                )}
              </td>
              <td className="admin-actions">
                {u.editing ? (
                  <>
                    <button
                      onClick={() => handleSave(u.id)}
                      className="admin-btn save"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEdit(u.id)}
                      className="admin-btn cancel"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(u.id)}
                      className="admin-btn edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="admin-btn delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`admin-page-btn ${
              currentPage === i + 1 ? "active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Admin;
