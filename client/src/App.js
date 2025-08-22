import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Store";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";
import AccessDenied from "./pages/AccessDenied";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOrders from "./pages/AdminOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Categories from "./pages/Categories";
import Terms from "./pages/Terms";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const { user } = useAuth();

  const getRedirectPath = () => {
    if (!user) return "/";
    return user.role === "admin" ? "/admin" : "/store";
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          {/* Public routes - accessible to everyone */}
          <Route path="/" element={<ProductList isPublic={true} />} />
          <Route path="/products" element={<ProductList isPublic={true} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Public pages - accessible to everyone */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Access Denied route */}
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Public routes with role-aware redirect */}
          <Route
            path="/login"
            element={user ? <Navigate to={getRedirectPath()} replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={getRedirectPath()} replace /> : <Signup />}
          />

          {/* Protected routes - require authentication */}
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Admin routes - require admin role */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-products"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-categories"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
