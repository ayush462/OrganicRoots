import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Scroll from "react-scroll";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaShoppingBasket,
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaPlusCircle,
} from "react-icons/fa";
import { CartSidebar } from "../Pages/CartSidebar";

let Link = Scroll.Link;

export const Header = () => {
  const [islogin, setislogin] = useState(!!sessionStorage.getItem("token"));
  const [cartCount, setCartCount] = useState(0);
  const [token] = useState(sessionStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false); // 🚨 NEW for buyer trying to add product

  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]); // {id, name}
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // sidebar cart state
  const [showCart, setShowCart] = useState(false);

  // mobile search panel
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setislogin(!!token);
  }, []);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  // Fetch cart count
  const fetchCartCount = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(
        "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/cart/count",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) {
        console.error("❌ /cart/count failed", res.status, await res.text());
        return;
      }

      const data = await res.json();
      setCartCount(data.count ?? 0);
    } catch (err) {
      console.error("❌ Error fetching cart count:", err);
    }
  };

  // Fetch logged-in user role
  const fetchUserRole = async () => {
    if (!token) {
      setUserRole(null);
      return;
    }

    try {
      const res = await fetch(
        "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/auth/role",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await res.json();
      setUserRole(data.role);
      console.log("✅ Fetched user role:", data.role);
      sessionStorage.setItem("role", data.role);
    } catch (err) {
      console.error("❌ Error fetching user role:", err);
      setUserRole(null);
    }
  };

  // Fetch all products for search suggestions
  const fetchAllProducts = async () => {
    try {
      const res = await fetch(
        "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/product/"
      );
      const data = await res.json();

      const raw = Array.isArray(data)
        ? data
        : Array.isArray(data.content)
        ? data.content
        : Array.isArray(data.products)
        ? data.products
        : [];

      const mapped = raw
        .filter((p) => p.productId && p.productName)
        .map((p) => ({
          id: p.productId,
          name: p.productName,
        }));

      setAllProducts(mapped);
    } catch (err) {
      console.error("❌ Error fetching products for search:", err);
    }
  };

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCartCount();
    fetchUserRole();
    fetchAllProducts();

    const handler = () => fetchCartCount();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, [token]);

  // Cart click
  const handalRedirect = () => {
    if (islogin) {
      openCart();
    } else {
      setShowLoginModal(true);
    }
  };

  // Logout logic
  const handalLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    setislogin(false);
    setUserRole(null);
    navigate(`/`);
    window.location.reload();
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    handalLogout();
    setShowLogoutModal(false);
    toast.success("Logged out successfully.");
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  // Login modal handlers
  const handleGoToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  // Search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const term = value.trim().toLowerCase();
    if (!term) {
      setSearchResults([]);
      return;
    }

    const results = allProducts
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, 6);

    setSearchResults(results);
  };

  // Submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      toast.error("Please enter a product name.");
      return;
    }

    const results = allProducts.filter((p) =>
      p.name.toLowerCase().includes(term)
    );

    if (results.length === 0) {
      toast.error("No matching product found.");
      return;
    }

    const exact = results.find(
      (p) => p.name.toLowerCase() === term.toLowerCase()
    );
    const target = exact ?? results[0];

    navigate(`/product/${target.id}`);
    setSearchResults([]);
    setShowMobileSearch(false);
  };

  // Click on suggestion
  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchResults([]);
    setSearchTerm(product.name);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🚨 New: handle Add Product in mobile with role check
  const handleAddProductClick = () => {
    if (!islogin) {
      setShowLoginModal(true);
      return;
    }

    if (userRole === "SELLER") {
      navigate("/addProduct");
    } else {
      // Buyer or unknown role
      setShowRoleModal(true);
    }
  };

  return (
    <>
      <motion.header
        className={`header organicroots-header ${isScrolled ? "shrink" : ""}`}
        data-header=""
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {/* MAIN ROW: Logo left, nav center (desktop), icons right */}
        <div className="nav-wrapper or-nav">
          <div className="container or-nav-inner">
            {/* 🌿 Logo */}
            <motion.div
              className="or-logo-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <a href="/" className="or-logo-link">
                <div className="or-logo-circle">
                  <span role="img" aria-label="cart">
                    🧺
                  </span>
                </div>
                <div className="or-logo-text">
                  <span className="or-logo-title">OrganicRoots</span>
                  <span className="or-logo-sub">
                    Veggies · Fruits · Grocery
                  </span>
                </div>
              </a>
            </motion.div>

            {/* NAV LINKS (desktop only) */}
            <nav className="navbar desktop-navbar" data-navbar="">
              <ul className="navbar-list or-nav-list">
                <li>
                  <a
                    href="/"
                    className="navbar-link or-nav-pill"
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> Home
                  </a>
                </li>

                <li>
                  <Link
                    activeClass="active"
                    className="navbar-link or-nav-pill"
                    smooth="linear"
                    spy
                    to="contact"
                    offset={-30}
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> About
                  </Link>
                </li>

                <li>
                  <a
                    href="/shop"
                    className="navbar-link or-nav-pill"
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> Shop
                  </a>
                </li>

                <li>
                  <Link
                    activeClass="active"
                    className="navbar-link or-nav-pill"
                    smooth="linear"
                    spy
                    to="products"
                    offset={-30}
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> Products
                  </Link>
                </li>

                <li>
                  <Link
                    activeClass="active"
                    className="navbar-link or-nav-pill"
                    smooth="linear"
                    spy
                    to="blog"
                    offset={-30}
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> Blog
                  </Link>
                </li>

                <li>
                  <Link
                    activeClass="active"
                    className="navbar-link or-nav-pill"
                    smooth="linear"
                    spy
                    to="contact"
                    offset={-30}
                    onClick={() => {}}
                  >
                    <span className="or-nav-icon"></span> Contact
                  </Link>
                </li>

                {/* SELLER ONLY */}
                {islogin && userRole === "SELLER" && (
                  <li>
                    <button
                      className="navbar-link or-nav-pill or-seller-pill"
                      onClick={() => {
                        navigate("/addProduct");
                      }}
                    >
                      <span className="or-nav-icon"></span>
                      Add Product
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            {/* RIGHT SIDE – Search (desktop) + icons (desktop only) */}
            <div className="header-action or-right">
              {/* Search (desktop – hidden on mobile) */}
              <div className="or-search-wrapper or-desktop-search">
                <form onSubmit={handleSearchSubmit} className="or-search-form">
                  <ion-icon
                    name="search-outline"
                    className="or-search-prefix"
                  />
                  <input
                    type="search"
                    placeholder="Search fresh items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="or-search-btn">
                    Go
                  </button>
                </form>

                {/* Suggestions dropdown */}
                <AnimatePresence>
                  {searchTerm.trim() && searchResults.length > 0 && (
                    <motion.ul
                      className="or-search-dropdown"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                    >
                      {searchResults.map((p) => (
                        <li
                          key={p.id}
                          onClick={() => handleSuggestionClick(p)}
                        >
                          <span className="or-suggestion-icon">🥒</span>
                          <span>{p.name}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* User icon (desktop) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="header-action-btn or-icon-btn or-mobile-hide-auth"
                aria-label="User/Login"
                onClick={() => navigate(islogin ? "/" : "/login")}
              >
                <FaUserCircle size={26} color="#305c3f" />
              </motion.button>

              {/* Cart icon (desktop) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="header-action-btn or-icon-btn or-mobile-hide-cart"
                aria-label="Cart"
                onClick={handalRedirect}
              >
                <FaShoppingBasket size={26} color="#305c3f" />
                <motion.span
                  className="or-cart-badge"
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cartCount}
                </motion.span>
              </motion.button>

              {/* Logout (desktop) */}
              {islogin && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="header-action-btn or-icon-btn or-mobile-hide-auth"
                  aria-label="Logout"
                  onClick={handleLogoutClick}
                >
                  <FaSignOutAlt size={26} color="#305c3f" />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH PANEL (under header, opened by bottom search button) */}
        {showMobileSearch && (
          <div className="or-mobile-search-panel">
            <div className="container">
              <div className="or-search-wrapper">
                <form onSubmit={handleSearchSubmit} className="or-search-form">
                  <ion-icon
                    name="search-outline"
                    className="or-search-prefix"
                  />
                  <input
                    type="search"
                    placeholder="Search fresh items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="or-search-btn">
                    Go
                  </button>
                </form>

                {/* Suggestions dropdown (mobile) */}
                <AnimatePresence>
                  {searchTerm.trim() && searchResults.length > 0 && (
                    <motion.ul
                      className="or-search-dropdown"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                    >
                      {searchResults.map((p) => (
                        <li
                          key={`m-${p.id}`}
                          onClick={() => handleSuggestionClick(p)}
                        >
                          <span className="or-suggestion-icon">🥒</span>
                          <span>{p.name}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </motion.header>

      {/* MOBILE BOTTOM NAVBAR: Home, Cart, Add Product, Search, User/Logout */}
      <div className="or-mobile-bottom-nav">
        {/* Home */}
        <button
          className="or-bottom-nav-btn"
          onClick={() => navigate("/")}
          aria-label="Home"
        >
          <FaHome size={20} />
        </button>

        {/* Cart with badge */}
        <button
          className="or-bottom-nav-btn"
          onClick={handalRedirect}
          aria-label="Cart"
        >
          <FaShoppingBasket size={20} />
          <motion.span
            className="or-cart-badge"
            key={`m-${cartCount}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {cartCount}
          </motion.span>
        </button>

        {/* Add product (role-aware) */}
        <button
          className="or-bottom-nav-btn"
          onClick={handleAddProductClick}
          aria-label="Add Product"
        >
          <FaPlusCircle size={20} />
        </button>

        {/* Search */}
        <button
          className="or-bottom-nav-btn"
          onClick={toggleMobileSearch}
          aria-label="Search"
        >
          <FaSearch size={18} />
        </button>

        {/* User / Logout icon */}
        <button
          className="or-bottom-nav-btn"
          onClick={() => {
            if (islogin) {
              handleLogoutClick();
            } else {
              navigate("/login");
            }
          }}
          aria-label={islogin ? "Logout" : "Login"}
        >
          {islogin ? <FaSignOutAlt size={20} /> : <FaUserCircle size={20} />}
        </button>
      </div>

      {/* Logout modal */}
      {showLogoutModal && (
        <div className="modal-backdrop">
          <motion.div
            className="modal-box or-modal"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
          >
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmLogout} className="btn btn-danger">
                Yes, logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Login-required modal */}
      {showLoginModal && (
        <div className="modal-backdrop">
          <motion.div
            className="modal-box or-modal"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
          >
            <p>You need to login to perform this action.</p>
            <div className="modal-actions">
              <button onClick={handleGoToLogin} className="btn btn-success">
                Go to Login
              </button>
              <button
                onClick={handleLoginModalClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Buyer-trying-to-add-product modal */}
      {showRoleModal && (
        <div className="modal-backdrop">
          <motion.div
            className="modal-box or-modal"
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
          >
            <p>
              You cannot add products with a buyer account. Please sign up as a
              seller to add products.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowRoleModal(false)}
                className="btn btn-secondary"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sidebar Cart */}
      <CartSidebar isOpen={showCart} onClose={closeCart} />

      <style>{`
        .organicroots-header {
          position: sticky;
          top: 0;
          z-index: 60;
          background: radial-gradient(circle at top, #e5ffe9, #f8fff9);
          box-shadow: 0 4px 16px rgba(21, 64, 38, 0.18);
          transition: all 0.2s ease;
        }

        .organicroots-header.shrink .or-nav {
          padding-top: 0;
          padding-bottom: 0;
        }

        .organicroots-header.shrink .or-logo-title {
          font-size: 17px;
        }

        .or-nav {
          padding: 6px 0;
        }

        .or-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .or-logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .or-logo-circle {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          background: radial-gradient(circle at top, #ffe9b8, #ffc96f);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0,0,0,0.16);
          font-size: 18px;
        }

        .or-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .or-logo-title {
          font-size: 18px;
          font-weight: 800;
          color: #214933;
          letter-spacing: 0.4px;
        }

        .or-logo-sub {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #547a60;
        }

        .navbar {
          display: flex;
          align-items: center;
        }

        .or-nav-list {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .or-nav-pill {
          position: relative;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 13px;
          text-decoration: none;
          color: #295a3a;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          overflow: hidden;
        }

        .or-nav-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, #dffae8, #f7fff9);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: -1;
        }

        .or-nav-pill:hover::before,
        .or-nav-pill.active::before {
          opacity: 1;
        }

        .or-nav-icon {
          font-size: 14px;
        }

        .or-seller-pill {
          background: linear-gradient(135deg,#6bc389,#3fa96a);
          color: #fff !important;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(63,169,106,0.35);
        }

        .or-right {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .or-search-wrapper {
          position: relative;
        }

        .or-search-form {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(63,169,106,0.18);
        }

        .or-search-form input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 13px;
          width: 150px;
        }

        .or-search-prefix {
          font-size: 18px;
          color: #4c7b5f;
        }

        .or-search-btn {
          border: none;
          background: linear-gradient(135deg,#6bc389,#3fa96a);
          color: #fff;
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 999px;
          cursor: pointer;
        }

        .or-search-dropdown {
          position: absolute;
          top: 110%;
          left: 0;
          right: 0;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 24px rgba(0,0,0,0.18);
          padding: 4px 0;
          margin: 4px 0 0;
          list-style: none;
          max-height: 220px;
          overflow-y: auto;
          z-index: 100;
        }

        .or-search-dropdown li {
          padding: 6px 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          cursor: pointer;
        }

        .or-search-dropdown li:hover {
          background: #f2fff6;
        }

        .or-suggestion-icon {
          font-size: 14px;
        }

        .or-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          position: relative;
          cursor: pointer;
        }

        .or-cart-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #ff7043;
          color: #fff;
          border-radius: 999px;
          font-size: 10px;
          padding: 0px 6px;
          line-height: 1.4;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .or-modal {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px 18px;
          max-width: 300px;
          width: 100%;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        }

        .or-modal p {
          margin-bottom: 12px;
          font-size: 14px;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        /* MOBILE-SPECIFIC STYLES */
        .or-mobile-search-panel {
          display: none;
        }

        .or-mobile-bottom-nav {
          display: none;
        }

        .or-mobile-hide-auth {
          /* desktop shows these, mobile hides */
        }

        .or-mobile-hide-cart {
          /* desktop shows these, mobile hides */
        }

        @media (max-width: 768px) {
          /* decrease header height on mobile */
          .or-nav {
            padding: 2px 0;
          }

          .organicroots-header {
            padding-bottom: 0;
          }

          .or-nav-inner {
            gap: 8px;
          }

          .or-logo-circle {
            width: 26px;
            height: 26px;
            border-radius: 10px;
            font-size: 15px;
          }

          .or-logo-title {
            font-size: 15px;
          }

          .or-logo-sub {
            font-size: 8px;
          }

          /* hide nav links on mobile, keep only logo */
          .desktop-navbar {
            display: none;
          }

          /* hide desktop inline search on mobile */
          .or-desktop-search {
            display: none;
          }

          .or-icon-btn {
            width: 38px;
            height: 38px;
            box-shadow: 0 3px 9px rgba(0,0,0,0.15);
          }

          .or-mobile-hide-auth {
            display: none;
          }

          .or-mobile-hide-cart {
            display: none;
          }

          .or-mobile-search-panel {
            display: block;
            padding-bottom: 4px;
          }

          .or-search-form input {
            width: 100%;
            font-size: 13px;
          }

          .or-mobile-bottom-nav {
            display: flex;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px;
            background: #ffffff;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
            z-index: 70;
            align-items: center;
            justify-content: space-around;
          }

          .or-bottom-nav-btn {
            flex: 1;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 0;
            position: relative; /* needed for mobile badge */
          }

          .or-bottom-nav-btn svg {
            color: #305c3f;
          }

          /* tweak cart badge position on mobile */
          .or-cart-badge {
            top: 2px;
            right: 18px;
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
};
