import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import "../styles/cart.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const response = await axios.post("/orders", {
        items: cart.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      });

      if (response.status === 201) {
        const orderId = response.data.order.id;
        clearCart();
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", { state: { orderId } });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.error || "Checkout failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">🛒 Shopping Cart</h1>
          <p className="cart-subtitle">Review your selected timepieces</p>
        </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🕐</div>
          <h2>Your cart is empty</h2>
          <p>Discover our collection of premium watches</p>
          <button 
            onClick={() => navigate("/store")}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <h3>Items ({cart.length})</h3>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=150&h=150&fit=crop"} 
                    alt={item.name} 
                  />
                </div>
                <div className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">₹{item.price.toLocaleString()}</div>
                </div>
                <div className="item-quantity">
                  <label>Qty:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18% GST)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate("/store")}
              className="continue-shopping-btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
              )}
      </div>
    </Layout>
  );
}

export default Cart;
