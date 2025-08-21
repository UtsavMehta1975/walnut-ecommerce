import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../utils/axios";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/products")
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle navigation state for pre-selected category or product
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory.toString());
    }
    if (location.state?.selectedProduct) {
      // Find the product and scroll to it
      const productElement = document.querySelector(`[data-product-id="${location.state.selectedProduct}"]`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.style.animation = 'highlight 2s ease-out';
      }
    }
  }, [location.state]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    
    // Enhanced feedback
    const cartButton = document.querySelector('.cart-btn');
    if (cartButton) {
      cartButton.style.transform = 'scale(1.1)';
      setTimeout(() => {
        cartButton.style.transform = 'scale(1)';
      }, 200);
    }
  };

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
                             product.categoryId?.toString() === selectedCategory;
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max));
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "stock":
          aValue = a.stock;
          bValue = b.stock;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
    setSortOrder("asc");
    setPriceRange({ min: "", max: "" });
  };

  if (loading) return <Layout><Spinner /></Layout>;

  return (
    <Layout>
      <div className="categories-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Our Complete Collection</h1>
              <p className="hero-subtitle">
                Discover timepieces that match your style and lifestyle. 
                Browse our extensive selection with advanced filtering and search capabilities.
              </p>
          </div>
        </section>

        {/* Advanced Filters Section */}
        <section className="filters-section">
          <div className="filters-container">
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
              >
                All Watches
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={`category-btn ${selectedCategory === category.id.toString() ? "active" : ""}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Advanced Filters */}
            <div className="advanced-filters">
              {/* Price Range */}
              <div className="price-filter">
                <label>Price Range:</label>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="price-input"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="sort-filter">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="stock">Stock</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                  className="sort-order-btn"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>

              {/* View Mode */}
              <div className="view-mode">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                >
                  ☰
                </button>
              </div>

              {/* Reset Filters */}
              <button onClick={resetFilters} className="reset-filters-btn">
                Reset All
              </button>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="results-summary">
          <div className="results-info">
            <p>
              Showing {filteredAndSortedProducts.length} of {products.length} products
              {selectedCategory !== "all" && ` in ${categories.find(c => c.id.toString() === selectedCategory)?.name}`}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🕐</div>
              <h3>No watches found</h3>
              <p>Try adjusting your search criteria or browse all categories</p>
              <button onClick={resetFilters} className="reset-filters-btn">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`products-container ${viewMode}`}>
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} data-product-id={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Can't Find What You're Looking For?</h2>
            <p className="cta-subtitle">
              Our expert team is here to help you find the perfect timepiece
            </p>
            <div className="cta-buttons">
              <button onClick={() => navigate("/contact")} className="cta-btn primary">
                Contact Us
              </button>
              <button onClick={() => navigate("/store")} className="cta-btn secondary">
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Categories;
