import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { FlashSale } from "./components/FlashSale";
import { ProductGrid } from "./components/ProductGrid";
import { Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { ProductDetail } from "./components/ProductDetail";
import { AuthModal } from "./components/AuthModal";
import { AdminPage } from "./pages/AdminPage";
import { StaffPage } from "./pages/StaffPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminLoginPrompt } from "./components/AdminLoginPrompt";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderHistory } from "./components/OrderHistory";
import { ChatBox, ChatButton } from "./components/ChatBox";
import { getAllProducts } from "./utils/productData";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState("shop"); // "shop" or "admin"
  const [profileOpen, setProfileOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [orders, setOrders] = useState(() => {
    // Initialize orders from localStorage
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch (e) {
        console.error("Failed to parse orders data");
      }
    }
    return [];
  });
  const [products, setProducts] = useState(() => {
    // Initialize products from localStorage or default
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch (e) {
        console.error("Failed to parse products data");
      }
    }
    return getAllProducts();
  });
  const [users, setUsers] = useState(() => {
    // Initialize users from localStorage
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (e) {
        console.error("Failed to parse users data");
      }
    }
    return [];
  });

  // Load user from localStorage on mount only
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        // Auto switch to admin view if user is admin/staff
        if (parsedUser.role === "admin" || parsedUser.role === "staff") {
          setViewMode("admin");
        }
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  // Remove admin dashboard event listener (not needed anymore)
  useEffect(() => {
    const handleOpenOrderHistory = () => {
      if (user) {
        setOrderHistoryOpen(true);
      }
    };

    window.addEventListener("openOrderHistory", handleOpenOrderHistory);

    return () => {
      window.removeEventListener("openOrderHistory", handleOpenOrderHistory);
    };
  }, [user]);

  // Save products to localStorage when they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Save users to localStorage when they change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    // Auto switch to admin view if admin/staff logs in
    if (userInfo.role === "admin" || userInfo.role === "staff") {
      setViewMode("admin");
    } else {
      setViewMode("shop");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode("shop");
    localStorage.removeItem("user");
  };

  const handleUpdateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const handleUpdateOrders = (updatedOrders) => {
    setOrders(updatedOrders);
  };

  const handleUpdateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const handleCheckout = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderComplete = (order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]); // Clear cart after successful order
  };

  const userOrders = user
    ? orders.filter((order) => order.email === user.email)
    : [];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If admin/staff is logged in, show admin dashboard as main page
  if (
    viewMode === "admin" &&
    user &&
    (user.role === "admin" || user.role === "staff")
  ) {
    return (
      <div className="min-h-screen bg-gray-50">
        {user.role === "admin" ? (
          <AdminPage
            user={user}
            products={products}
            orders={orders}
            users={users}
            onClose={() => setViewMode("shop")}
            onUpdateProducts={handleUpdateProducts}
            onUpdateOrders={handleUpdateOrders}
            onUpdateUsers={handleUpdateUsers}
          />
        ) : (
          <StaffPage
            user={user}
            products={products}
            orders={orders}
            onClose={() => setViewMode("shop")}
            onUpdateOrders={handleUpdateOrders}
          />
        )}
      </div>
    );
  }

  // Customer view (shop)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onSwitchToAdmin={() => setViewMode("admin")}
        onViewProfile={() => setProfileOpen(true)}
      />

      <main>
        <HeroBanner />
        <FlashSale
          onAddToCart={addToCart}
          onProductClick={setSelectedProduct}
          products={products}
        />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
          <ProductGrid
            title="Laptop - Máy Tính"
            category="laptop"
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
            products={products}
          />
          <ProductGrid
            title="Điện Thoại - Smartphone"
            category="phone"
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
            products={products}
          />
          <ProductGrid
            title="Âm Thanh - Tai Nghe"
            category="audio"
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
            products={products}
          />
          <ProductGrid
            title="Phụ Kiện - Accessories"
            category="accessories"
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
            products={products}
          />
        </div>
      </main>

      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        user={user}
        onOrderComplete={handleOrderComplete}
      />

      <OrderHistory
        isOpen={orderHistoryOpen}
        onClose={() => setOrderHistoryOpen(false)}
        orders={userOrders}
      />

      {/* Profile Modal */}
      {profileOpen && (
        <ProfilePage
          user={user}
          onUpdateUser={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
          onClose={() => setProfileOpen(false)}
        />
      )}

      {/* Test Accounts Button */}
      <button
        onClick={() => setShowTestAccounts(!showTestAccounts)}
        className="fixed bottom-4 left-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40 flex items-center gap-2"
        title="Tài khoản test"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-sm font-semibold">Test</span>
      </button>

      <AdminLoginPrompt
        isOpen={showTestAccounts}
        onClose={() => setShowTestAccounts(false)}
      />

      {/* Chat AI */}
      {!chatOpen && <ChatButton onClick={() => setChatOpen(true)} />}
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
