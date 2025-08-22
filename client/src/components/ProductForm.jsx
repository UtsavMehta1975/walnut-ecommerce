import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price?.toString() || '');
      setStock(initialData.stock || 0);
      setCategoryId(initialData.categoryId?.toString() || '');
      setDescription(initialData.description || '');
      setInStock(initialData.inStock !== false);
      setImagePreview(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select a valid image file (JPEG, PNG, WEBP)');
        return;
      }
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Image size must be less than 2MB');
        return;
      }

      setImageFile(file);
      setUploadError('');
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await axios.post('/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.imageUrl;
    } catch (err) {
      console.error('Image upload failed:', err);
      throw new Error(err.response?.data?.error || 'Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');

    try {
      let finalImageUrl = null;
      
      // Upload new image if selected
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      } else if (imagePreview && !imageFile) {
        // Use existing image URL if no new file selected
        finalImageUrl = imagePreview;
      }

      const productData = {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
        imageUrl: finalImageUrl,
        description: description || '',
        inStock: Boolean(inStock),
      };

      await onSave(productData);
    } catch (err) {
      console.error('Failed to save product:', err);
      setUploadError(err.message || 'Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setUploadError('');
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <h3>{initialData ? 'Edit Product' : 'Add New Product'}</h3>
        
        <form onSubmit={handleSubmit} className="product-form-content">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                placeholder="0"
              />
            </div>
            
            <div className="form-group">
              <label>Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <div className="image-upload-section">
              <div className="image-upload-controls">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="image-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="image-upload-btn">
                  📸 Upload Image
                </label>
                
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="remove-image-btn"
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
              
              {uploadError && (
                <div className="upload-error">
                  ❌ {uploadError}
                </div>
              )}
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <div className="image-info">
                    {imageFile && (
                      <p>📁 {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)}MB)</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="upload-help">
                <p>💡 Supported formats: JPEG, PNG, WEBP (max 2MB)</p>
              </div>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              In Stock
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="save-btn"
              disabled={uploading}
            >
              {uploading ? 'Saving...' : (initialData ? 'Update' : 'Create')} Product
            </button>
            <button 
              type="button" 
              onClick={onCancel}
              className="cancel-btn"
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
