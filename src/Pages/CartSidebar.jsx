// src/Pages/CartSidebar.jsx
import React, { useEffect, useState } from "react";
import { Items } from "../Component/CartComponent/Items";
import { motion, AnimatePresence } from "framer-motion";
import { OrganicRootsLoader } from "../Component/OrganicRootsLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ NEW

const BASE_URL =
  "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const CartSidebar = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(0); // for refetch on +/-/remove
  const [isCartLoading, setIsCartLoading] = useState(false); // sidebar loader
  const [totalAmount, setTotalAmount] = useState(0);
  const [token] = useState(sessionStorage.getItem("token"));

  const navigate = useNavigate(); // ✅ NEW

  // decode user (optional, just logging)
  useEffect(() => {
    if (!token) return;
    try {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      console.log("User ID:", userId);
    } catch (e) {
      console.error("Invalid token", e);
    }
  }, [token]);

  // 🛒 Fetch cart
  const fetchCart = async () => {
    try {
      if (!token) return;
      console.log("Token:", token);
      const res = await fetch(`${BASE_URL}/cart/1`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        console.error("Cart fetch failed", res.status, await res.text());
        return;
      }

      const data = await res.json();
      setTotalAmount(data.totalAmount || 0);
      setItem(data.cartDetalis || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // 🔄 When sidebar opens → show loader + fetch cart
  useEffect(() => {
    if (isOpen) {
      setIsCartLoading(true);
      fetchCart().finally(() => setIsCartLoading(false));
    }
  }, [isOpen]);

  // 🔁 When qty/remove changes → refetch quietly (no loader)
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [loading, isOpen]);

  // 🧱 Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const createOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/payment/${grandTotal.toFixed(2)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        console.error("Create order failed", res.status, await res.text());
        toast.error("Error creating order");
        return null;
      }

      const da = await res.json();
      console.log("Order from backend:", da);
      setData(da);
      return da;
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Error creating order");
      return null;
    }
  };

  // 👉 clear cart after successful payment
  // const clearCartOnSuccess = async () => {
  //   try {
  //     if (!token) {
  //       setItem([]);
  //       setTotalAmount(0);
  //       return;
  //     }

  //     const res = await fetch(`${BASE_URL}/cart/clear`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     });

  //     if (!res.ok) {
  //       console.error("Failed to clear cart:", res.status, await res.text());
  //       setItem([]);
  //       setTotalAmount(0);
  //       toast.error(
  //         "Payment successful, but there was an issue clearing the cart. Please refresh."
  //       );
  //       return;
  //     }

  //     setItem([]);
  //     setTotalAmount(0);
  //     toast.success("Payment successful! Your cart has been cleared.");
  //     onClose(); // close the sidebar after success
  //   } catch (err) {
  //     console.error("Error clearing cart:", err);
  //     setItem([]);
  //     setTotalAmount(0);
  //     toast.error(
  //       "Payment successful, but there was an issue clearing the cart. Please refresh."
  //     );
  //   }
  // };

  const handlePayment = async () => {
    if (!totalAmount || totalAmount <= 0) {
      toast.error("Cart is empty");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Unable to load payment gateway");
      return;
    }

    const order = await createOrder();
    if (!order || !order.orderId) {
      toast.error("Could not initiate payment");
      return;
    }

    const options = {
      key: order.razorpayKey,
      amount: order.amount.toString(),
      currency: order.currency || "INR",
      name: "Organic Roots",
      description: "Order Payment",
      image: "https://example.com/your_logo",
      order_id: order.orderId,
      theme: {
        color: "#3fa96a", // 🌿 organic green
      },
      handler: async function (response) {
        console.log("Payment success:", response);

        // ✅ 1. Clear cart
        // await clearCartOnSuccess();

        // ✅ 2. Redirect to order success / tracking page
        navigate("/order-success", {
          state: {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            backendOrderId: order.orderId,
            amount: grandTotal.toFixed(2),
            eta: "25-30 mins",
            deliveryPartner: "Organic Roots Rider",
          },
        });
      },
      prefill: {
        name: "saurav",
        email: "saurav@gmail.com",
        contact: "7405999619",
      },
      notes: {
        address: "ABC, Delhi",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      toast.error("Payment failed. Please try again.");
    });

    rzp1.open();
  };

  const calculateShipping = (totalAmount) => {
    if (totalAmount >= 499) {
      return 0;
    } else if (totalAmount >= 1 && totalAmount <= 200) {
      return 30;
    } else if (totalAmount >= 200 && totalAmount < 499) {
      return 20;
    } else {
      return 0;
    }
  };

  const shippingCharge = calculateShipping(totalAmount);
  const tax = (totalAmount * 18) / 100;
  const grandTotal = totalAmount + tax + shippingCharge;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("cart-overlay")) {
      onClose();
    }
  };

  // ESC to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handler);
    }
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cart-overlay"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="cart-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: "100%",
              maxWidth: "520px",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* header */}
            <div
              className="cart-sidebar-header d-flex justify-content-between align-items-center"
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div>
                <h5 className="mb-0">My Cart</h5>
                <small className="text-muted">
                  {item.length} item{item.length !== 1 ? "s" : ""} in your cart
                </small>
              </div>
              <button className="cart-close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* body + summary */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 56px)",
              }}
            >
              {/* cart items */}
              <div
                className="cart-sidebar-body"
                style={{
                  flex: 1,
                  padding: "8px 16px 8px 16px",
                }}
              >
                {isCartLoading ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <OrganicRootsLoader />
                  </div>
                ) : item && item.length > 0 ? (
                  item.map((elem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Items prop={elem} setLoading={setLoading} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted text-center mt-4">
                    Your cart is empty. Add some items!
                  </p>
                )}
              </div>

              {/* order summary */}
              <div
                className="cart-sidebar-footer"
                style={{
                  borderTop: "1px solid #e5e7eb",
                  padding: "8px 16px 12px 16px",
                }}
              >
                <div className="cart-summary mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Order Subtotal</span>
                    <span>₹ {totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Shipping & handling</span>
                    <span>₹ {shippingCharge}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Tax (18%)</span>
                    <span>₹ {tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-weight-bold">Total</span>
                    <h5 className="mb-0">₹ {grandTotal.toFixed(2)}</h5>
                  </div>

                  <button
                    className="btn btn-dark btn-block rounded-pill mt-3 w-100 cart-checkout-btn"
                    onClick={handlePayment}
                    disabled={item.length === 0}
                    style={{
                      background:
                        "linear-gradient(135deg, #6bc389, #3fa96a)",
                      border: "none",
                    }}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
