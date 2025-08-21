import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import "../styles/layout.css";

const Layout = ({ children, showHeader = true, showFooter = true, showNav = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Global search functionality
  const handleSearch = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`/products?search=${term}`);
      setSearchResults(response.data.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoriesDropdownOpen(false);
  }, [location.pathname]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchResultClick = (product) => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearchOpen(false);
    navigate("/categories", { state: { selectedProduct: product.id } });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    }
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  return (
    <div className="layout-container">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      {/* Header */}
      {showHeader && (
        <header className="layout-header">
          <div className="header-content">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Logo */}
            <div className="logo-section">
              <h1 className="store-logo" onClick={() => navigate("/store")}>
                ⏰ Walnut
              </h1>
              <p className="store-tagline">Premium Timepieces</p>
            </div>

            {/* Global Search - Hidden on Mobile */}
            <div className="search-container desktop-only">
              <button className="search-toggle-btn" onClick={toggleSearch}>
                🔍
              </button>
              {isSearchOpen && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    placeholder="Search for watches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {isSearching && (
                    <div className="search-loading">
                      <div className="spinner"></div>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="search-result-item"
                          onClick={() => handleSearchResultClick(product)}
                        >
                          <img
                            src={product.imageUrl || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=50&h=50&fit=crop"}
                            alt={product.name}
                            className="search-result-image"
                          />
                          <div className="search-result-info">
                            <h4>{product.name}</h4>
                            <p>₹{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Actions - Hidden on Mobile */}
            <div className="user-actions desktop-only">
              {user && (
                <>
                  <button
                    onClick={() => navigate("/cart")}
                    className="cart-btn"
                  >
                    🛒
                    {cartItemCount > 0 && (
                      <span className="cart-badge">{cartItemCount}</span>
                    )}
                  </button>
                  <button
                    onClick={() => navigate("/my-orders")}
                    className="orders-btn"
                  >
                    📦
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="admin-btn"
                    >
                      👑
                    </button>
                  )}
                </>
              )}
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Navigation */}
      {showNav && user && (
        <nav className="layout-nav">
          <div className="nav-content">
            <div className="nav-links">
              {location.pathname !== "/store" && (
                <button 
                  onClick={() => navigate("/store")} 
                  className="nav-link"
                >
                  🏠 Store
                </button>
              )}
              
              {/* Categories Dropdown */}
              <div className="categories-dropdown">
                <button 
                  onClick={toggleCategoriesDropdown}
                  className={`nav-link dropdown-toggle ${isCategoriesDropdownOpen ? "active" : ""}`}
                >
                  📂 Categories ▼
                </button>
                {isCategoriesDropdownOpen && (
                  <div className="dropdown-menu">
                    <button 
                      onClick={() => navigate("/categories")}
                      className="dropdown-item"
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => navigate("/categories", { state: { selectedCategory: category.id } })}
                        className="dropdown-item"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate("/about")} 
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              >
                About
              </button>
              <button 
                onClick={() => navigate("/contact")} 
                className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              >
                Contact
              </button>
              <button 
                onClick={() => navigate("/projects")} 
                className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}
              >
                Projects
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Side Menu */}
      <div className={`mobile-side-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="close-menu-btn" onClick={toggleMobileMenu}>
            ✕
          </button>
        </div>

        <div className="mobile-menu-content">
          {/* User Info */}
          {user && (
            <div className="mobile-user-info">
              <div className="user-avatar">👤</div>
              <div className="user-details">
                <h3>{user.username}</h3>
                <p>{user.role}</p>
              </div>
            </div>
          )}

          {/* Mobile Search */}
          <div className="mobile-search-section">
            <h4>Search</h4>
            <div className="mobile-search-container">
              <input
                type="text"
                placeholder="Search for watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mobile-search-input"
              />
              {isSearching && (
                <div className="mobile-search-loading">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="mobile-search-results">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="mobile-search-result-item"
                    onClick={() => handleSearchResultClick(product)}
                  >
                    <img
                      src={product.imageUrl || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=40&h=40&fit=crop"}
                      alt={product.name}
                      className="mobile-search-result-image"
                    />
                    <div className="mobile-search-result-info">
                      <h5>{product.name}</h5>
                      <p>₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-nav-section">
            <h4>Navigation</h4>
            {location.pathname !== "/store" && (
              <button 
                onClick={() => navigate("/store")} 
                className="mobile-nav-item"
              >
                🏠 Store
              </button>
            )}
            
            <button 
              onClick={() => navigate("/categories")} 
              className={`mobile-nav-item ${location.pathname === "/categories" ? "active" : ""}`}
            >
              📂 All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate("/categories", { state: { selectedCategory: category.id } })}
                className="mobile-nav-item sub-item"
              >
                {category.name}
              </button>
            ))}

            <button 
              onClick={() => navigate("/about")} 
              className={`mobile-nav-item ${location.pathname === "/about" ? "active" : ""}`}
            >
              About Us
            </button>
            <button 
              onClick={() => navigate("/contact")} 
              className={`mobile-nav-item ${location.pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </button>
            <button 
              onClick={() => navigate("/projects")} 
              className={`mobile-nav-item ${location.pathname === "/projects" ? "active" : ""}`}
            >
              Projects
            </button>
          </div>

          {/* Mobile User Actions */}
          {user && (
            <div className="mobile-actions-section">
              <h4>Quick Actions</h4>
              <button 
                onClick={() => navigate("/cart")} 
                className="mobile-action-btn"
              >
                🛒 Shopping Cart ({cartItemCount})
              </button>
              <button 
                onClick={() => navigate("/my-orders")} 
                className="mobile-action-btn"
              >
                📦 My Orders
              </button>
              {user.role === "admin" && (
                <button 
                  onClick={() => navigate("/admin")} 
                  className="mobile-action-btn"
                >
                  👑 Admin Panel
                </button>
              )}
            </div>
          )}

          {/* Mobile Footer Links */}
          <div className="mobile-footer-section">
            <h4>Support</h4>
            <button onClick={() => navigate("/terms")} className="mobile-footer-link">
              Terms & Conditions
            </button>
            <button onClick={handleLogout} className="mobile-footer-link logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="layout-main">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="layout-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Walnut</h4>
              <p>Premium timepieces for discerning collectors</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <button onClick={() => navigate("/store")}>Store</button>
              <button onClick={() => navigate("/categories")}>Categories</button>
              <button onClick={() => navigate("/about")}>About Us</button>
              <button onClick={() => navigate("/contact")}>Contact</button>
              <button onClick={() => navigate("/projects")}>Projects</button>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <button onClick={() => navigate("/my-orders")}>Track Orders</button>
              <button onClick={() => navigate("/cart")}>Shopping Cart</button>
              <button onClick={() => navigate("/terms")}>Terms & Conditions</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Walnut. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
