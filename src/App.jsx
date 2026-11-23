
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import ProductDetails from "./components/ProductDetails";
import CartSection from "./components/CartSection";
import WishlistSection from "./components/WishlistSection";
import CheckoutSection from "./components/CheckoutSection";

import OrdersPage from "./pages/OrdersPage";
import TrackOrder from "./pages/TrackOrder";
import LoginSignup from "./pages/LoginSignup";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";

import products from "./Data/products";

function HomePage(props) {
  return (
    <>
      <Hero />
      <ProductSection {...props} />
    </>
  );
}

function ShopPage(props) {
  return <ProductSection {...props} />;
}

function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) return <Navigate to="/shop" replace />;

  return (
    <ProductDetails
      product={product}
      onBack={() => navigate("/shop")}
      onAddToCart={onAddToCart}
    />
  );
}

function AppContent() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem("luxe-cart") || "[]")
  );

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("luxe-wishlist") || "[]")
  );

  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("luxe-orders") || "[]")
  );

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("luxe-user") || "null")
  );

  useEffect(() => {
    localStorage.setItem("luxe-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("luxe-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("luxe-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("luxe-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("luxe-user");
    }
  }, [user]);

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });

    navigate("/cart");
  }

  function handleRemoveFromCart(productId, size) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          !(item.id === productId && item.size === size)
      )
    );
  }

  function handleQuantityChange(productId, size, change) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleWishlist(product) {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item.id === product.id
      );

      return exists
        ? previousWishlist.filter((item) => item.id !== product.id)
        : [...previousWishlist, product];
    });
  }

  function handlePlaceOrder() {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      items: cartItems.map((item) => ({ ...item })),
      total,
      status: "Order Placed"
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders
    ]);

    setCartItems([]);
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
    navigate("/login");
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const productProps = {
    onAddToCart: handleAddToCart,
    wishlist,
    onWishlist: handleWishlist,
    onViewDetails: (product) =>
      navigate(`/product/${product.id}`)
  };

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<HomePage {...productProps} />} />

        <Route path="/shop" element={<ShopPage {...productProps} />} />

        <Route
          path="/product/:id"
          element={<ProductPage onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/cart"
          element={
            <CartSection
              cartItems={cartItems}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
              onCheckout={() => navigate("/checkout")}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishlistSection
              wishlist={wishlist}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutSection
              cartItems={cartItems}
              onBack={() => navigate("/cart")}
              onPlaceOrder={handlePlaceOrder}
            />
          }
        />

        <Route
          path="/orders"
          element={<OrdersPage orders={orders} />}
        />

        <Route
          path="/track-order/:id"
          element={<TrackOrder orders={orders} />}
        />

        <Route
          path="/login"
          element={<LoginSignup onLogin={handleLogin} />}
        />

        <Route
          path="/profile"
          element={
            <ProfilePage user={user} onLogout={handleLogout} />
          }
        />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <h2>LUXE</h2>
        <p>Style That Speaks. Elegance That Lasts.</p>
        <p>© 2026 LUXE Fashion Store. All rights reserved.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
