import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import "../styles/productList.css";

function ProductList({ isPublic = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.Category?.name === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner">⏰</div>
        <p>Loading our premium collection...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Hero Section */}
      <div className="product-list-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {isPublic ? "🛍️ Premium Collection" : "🛍️ Product Catalog"}
          </h1>
          <p className="hero-subtitle">
            Discover our curated selection of luxury timepieces and accessories
          </p>
          
          {isPublic && (
            <div className="hero-actions">
              <Link 
                to="/login" 
                className="login-btn"
              >
                🔐 Login
              </Link>
              <Link 
                to="/signup" 
                className="signup-btn"
              >
                ✨ Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="product-list-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        {selectedCategory !== 'all' && (
          <button 
            onClick={() => setSelectedCategory('all')}
            className="clear-filter-btn"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isPublic={isPublic}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="reset-filters-btn"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      {isPublic && (
        <div className="product-list-cta">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Create an account to save your favorites and track your orders</p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-login-btn">
                🔐 Login to Your Account
              </Link>
              <Link to="/signup" className="cta-signup-btn">
                ✨ Create New Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
