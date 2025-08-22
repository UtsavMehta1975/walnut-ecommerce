import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/productCard.css";

function ProductCard({ product, onAddToCart, viewMode = "grid", isPublic = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (isPublic && !user) {
      // Redirect to login for public users
      navigate("/login", { 
        state: { 
          message: "Please login to add items to your cart",
          returnTo: `/product/${product.id}`
        }
      });
    } else if (onAddToCart) {
      // Normal add to cart for authenticated users
      onAddToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (isPublic && !user) {
      // Redirect to signup for public users
      navigate("/signup", { 
        state: { 
          message: "Please sign up to purchase this item",
          returnTo: `/product/${product.id}`
        }
      });
    } else {
      // For authenticated users, go to product detail
      navigate(`/product/${product.id}`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={`product-card ${viewMode}`}>
      <div className="product-image-container">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <button 
            onClick={handleViewDetails}
            className="view-details-btn"
          >
            <span className="btn-text">View Details</span>
            <span className="btn-icon">👁️</span>
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            <span className="btn-text">
              {isPublic && !user ? "Login to Add" : "Add to Cart"}
            </span>
            <span className="btn-icon">
              {isPublic && !user ? "🔐" : "+"}
            </span>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-container">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span className="product-stock">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        
        {/* Buy Now button for public users */}
        {isPublic && (
          <button 
            onClick={handleBuyNow}
            className="buy-now-btn"
            disabled={!product.inStock}
          >
            💳 Buy Now
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
