import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import "../styles/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      // Redirect to signup for public users
      navigate("/signup", { 
        state: { 
          message: "Please sign up to purchase this item",
          returnTo: `/product/${id}`
        }
      });
    } else {
      // For authenticated users, add to cart and go to cart
      // This would need cart context integration
      navigate("/cart");
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      // Redirect to login for public users
      navigate("/login", { 
        state: { 
          message: "Please login to add this item to your cart",
          returnTo: `/product/${id}`
        }
      });
    } else {
      // For authenticated users, add to cart
      // This would need cart context integration
      console.log("Add to cart:", product);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner">⏰</div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="back-to-store-btn">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* Header */}
      <header className="product-detail-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <h1 className="store-logo">🌰 Walnut</h1>
          </Link>
          <div className="header-actions">
            {!user ? (
              <>
                <Link to="/login" className="login-btn">
                  🔐 Login
                </Link>
                <Link to="/signup" className="signup-btn">
                  ✨ Sign Up
                </Link>
              </>
            ) : (
              <Link to="/store" className="back-to-store-btn">
                ← Back to Store
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/products">Products</Link>
        <span> / </span>
        <span>{product.name}</span>
      </nav>

      {/* Product Details */}
      <main className="product-detail-main">
        <div className="product-detail-content">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="product-image">
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop"} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop";
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-category">
                {product.Category?.name || "Uncategorized"}
              </div>
            </div>

            <div className="product-price">
              <span className="price-amount">₹{product.price.toLocaleString()}</span>
              {product.inStock ? (
                <span className="stock-status in-stock">In Stock</span>
              ) : (
                <span className="stock-status out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description || "No description available."}</p>
            </div>

            <div className="product-specs">
              <h3>Specifications</h3>
              <ul>
                <li><strong>Category:</strong> {product.Category?.name || "Uncategorized"}</li>
                <li><strong>Stock:</strong> {product.stock || 0} units</li>
                <li><strong>Status:</strong> {product.inStock ? "Available" : "Unavailable"}</li>
              </ul>
            </div>

            <div className="product-actions">
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn"
                disabled={!product.inStock}
              >
                🛒 Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="buy-now-btn"
                disabled={!product.inStock}
              >
                💳 Buy Now
              </button>
            </div>

            {!user && (
              <div className="login-reminder">
                <p>💡 <strong>Login required</strong> to add items to cart or make purchases</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="product-detail-footer">
        <div className="footer-content">
          <p>© 2024 🌰 Walnut E-commerce. Premium timepieces for discerning collectors.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
