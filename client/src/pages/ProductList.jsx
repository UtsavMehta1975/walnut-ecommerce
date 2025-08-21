import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import "../styles/productList.css";

function ProductList() {
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🛍️ Browse Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
