import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";
import Layout from "../components/Layout";
import "../styles/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
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
      addToCart(product);
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
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="product-detail-loading">
          <div className="loading-spinner">⏰</div>
          <p>Loading product details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="product-detail-error">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="back-to-store-btn">
            Back to Store
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-detail-container">
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
                  <li><strong>Category:</strong> <span>{product.Category?.name || "Uncategorized"}</span></li>
                  <li><strong>Stock:</strong> <span>{product.stock || 0} units</span></li>
                  <li><strong>Status:</strong> <span>{product.inStock ? "Available" : "Unavailable"}</span></li>
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
      </div>
    </Layout>
  );
};

export default ProductDetail;
