import "../styles/productCard.css";

function ProductCard({ product, onAddToCart, viewMode = "grid" }) {
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
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
          >
            <span className="btn-text">Add to Cart</span>
            <span className="btn-icon">+</span>
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
      </div>
    </div>
  );
}

export default ProductCard;
