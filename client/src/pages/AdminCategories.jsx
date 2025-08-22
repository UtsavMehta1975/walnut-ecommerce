import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import AdminNav from '../components/AdminNav';
import '../styles/adminCategories.css';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`/categories/${editingCategory.id}`, formData);
      } else {
        await axios.post('/categories', formData);
      }
      setShowForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to save category:', err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setShowForm(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div className="admin-categories-loading">Loading categories...</div>;

  return (
    <div className="admin-categories-container">
      <h2 className="admin-categories-title">📂 Manage Categories</h2>
      
      <AdminNav />

      <div className="admin-categories-header">
        <button onClick={handleAdd} className="admin-categories-add-btn">
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="admin-categories-form-overlay">
          <div className="admin-categories-form">
            <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">
                {category.description || 'No description provided'}
              </p>
              <div className="category-actions">
                <button 
                  onClick={() => handleEdit(category)}
                  className="edit-btn"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(category.id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="admin-categories-empty">
          <p>No categories found. Create your first category!</p>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
