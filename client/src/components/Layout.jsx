import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import '../styles/layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { cart: cartItems = [] } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header">
        <div className="header-content">
          <Link to="/store" className="logo">
            🌰 Walnut
          </Link>
          
          <div className="header-actions">
            <ThemeToggle />
            
            {user ? (
              <div className="user-actions">
                <Link to="/cart" className="cart-btn">
                  🛒 Cart
                  {cartItems?.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </Link>
                
                <Link to="/my-orders" className="orders-btn">
                  📋 Orders
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className="admin-btn">
                    ⚙️ Admin
                  </Link>
                )}
                
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="user-actions">
                <Link to="/login" className="auth-btn">
                  🔐 Login
                </Link>
                <Link to="/signup" className="auth-btn">
                  ✨ Signup
                </Link>
              </div>
            )}
            
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="layout-nav">
        <div className="nav-content">
          <div className="nav-links">
            <Link 
              to="/store" 
              className={`nav-link ${isActive('/store') ? 'active' : ''}`}
            >
              🏠 Home
            </Link>
            
            <Link 
              to="/categories" 
              className={`nav-link ${isActive('/categories') ? 'active' : ''}`}
            >
              📂 Categories
            </Link>
            
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              ℹ️ About
            </Link>
            
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              📞 Contact
            </Link>
            
            <Link 
              to="/projects" 
              className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
            >
              🚀 Projects
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>🌰 Walnut</h2>
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
        </div>
        
        <div className="mobile-nav-links">
          <Link 
            to="/store" 
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            🏠 Home
          </Link>
          
          <Link 
            to="/categories" 
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            📂 Categories
          </Link>
          
          <Link 
            to="/about" 
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            ℹ️ About
          </Link>
          
          <Link 
            to="/contact" 
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            📞 Contact
          </Link>
          
          <Link 
            to="/projects" 
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            🚀 Projects
          </Link>
          
          {user && (
            <>
              <Link 
                to="/cart" 
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                🛒 Cart ({cartItems?.length || 0})
              </Link>
              
              <Link 
                to="/my-orders" 
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                📋 Orders
              </Link>
              
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  ⚙️ Admin
                </Link>
              )}
              
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="mobile-nav-link"
              >
                🚪 Logout
              </button>
            </>
          )}
          
          {!user && (
            <>
              <Link 
                to="/login" 
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                🔐 Login
              </Link>
              
              <Link 
                to="/signup" 
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                ✨ Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="layout-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2024 🌰 Walnut E-commerce. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
