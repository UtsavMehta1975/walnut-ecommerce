import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import "../styles/productList.css";

function ProductList({ isPublic = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading products...</div>;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {isPublic ? "🛍️ Browse Our Collection" : "🛍️ Browse Products"}
      </h2>
      
      {isPublic && (
        <div className="text-center mb-8">
          <p className="text-gray-300 mb-4">
            Explore our premium timepieces. Login to add items to your cart.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              🔐 Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ✨ Sign Up
            </Link>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p.id} 
            product={p} 
            isPublic={isPublic}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
