import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductRow from "../components/ProductRow";
import ProductForm from "../components/ProductForm";
import AdminNav from "../components/AdminNav"; // ✅ Added navigation
import "../styles/adminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        await axios.put(`/products/${editingProduct.id}`, data);
      } else {
        await axios.post("/products", data);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-products-container">
      <h2 className="admin-products-title">🛠️ Manage Products</h2>

      {/* 🔗 Admin Navigation */}
      <AdminNav />

      <button onClick={handleAdd} className="admin-products-add-btn">
        + Add Product
      </button>

      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="admin-products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onEdit={() => handleEdit(p)}
              onDelete={() => handleDelete(p.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
