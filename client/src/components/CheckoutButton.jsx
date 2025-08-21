import React from "react";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CheckoutButton = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
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
        navigate("/order-confirmation", { state: { orderId } });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
