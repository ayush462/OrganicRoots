import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";
import { Items } from "../Component/CartComponent/Items";

const BASE_URL = "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090";

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

export const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState(null);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [token] = useState(sessionStorage.getItem("token"));

  const userId = JSON.parse(atob(token.split(".")[1])).id;
  console.log("User ID:", userId);

  const fetchCart = async () => {
    try {
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

  useEffect(() => {
    fetchCart();
  }, [loading]);

  const createOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/payment/${totalAmount}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        console.error("Create order failed", res.status, await res.text());
        alert("Failed to create order");
        return null;
      }

      const da = await res.json();
      console.log("Order from backend:", da);
      setData(da);
      return da;
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Error creating order");
      return null;
    }
  };

  const handlePayment = async () => {
    if (!totalAmount || totalAmount <= 0) {
      alert("Cart is empty or total amount invalid");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const order = await createOrder();
    if (!order || !order.orderId) {
      alert("Order details missing from backend");
      return;
    }

    const options = {
      key: order.razorpayKey,
      amount: order.amount.toString(),
      currency: order.currency || "INR",
      name: "userName",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.orderId,
      handler: function (response) {
        console.log("Payment success:", response);
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: "vivek",
        email: "vivek@gmail.com",
        contact: "7405999619",
      },
      notes: {
        address: "ABC, Delhi",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      alert(response.error.description);
    });

    rzp1.open();
  };

  const calculateShipping = (totalAmount) => {
    if (totalAmount >= 499) {
      return 0;
    } else if (totalAmount >= 100 && totalAmount <= 200) {
      return 20;
    } else {
      return 40;
    }
  };

  const shippingCharge = calculateShipping(totalAmount);
  const tax = (totalAmount * 18) / 100;
  const grandTotal = totalAmount + tax + shippingCharge;

  // simple static recommended products (UI only, backend unchanged)
  const recommended = [
    { id: 1, name: "Fresh Tomatoes", price: 40 },
    { id: 2, name: "Daily Milk 1L", price: 60 },
    { id: 3, name: "Brown Bread", price: 35 },
    { id: 4, name: "Organic Eggs (6)", price: 90 },
  ];

  return (
    <>
      <Header />

      <div className="cart-overlay">
        <div className="cart-sidebar">
          {/* header */}
          <div className="cart-sidebar-header d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">My Cart</h5>
              <small className="text-muted">
                {item.length} item{item.length !== 1 ? "s" : ""} in your cart
              </small>
            </div>
          </div>

          {/* cart items scroll area */}
          <div className="cart-sidebar-body">
            {item && item.length > 0 ? (
              item.map((elem, index) => (
                <Items key={index} prop={elem} setLoading={setLoading} />
              ))
            ) : (
              <p className="text-muted text-center mt-4">
                Your cart is empty. Add some items!
              </p>
            )}
          </div>

          {/* order summary + recommended */}
          <div className="cart-sidebar-footer">
            <div className="cart-summary mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Order Subtotal</span>
                <span>₹ {totalAmount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping & handling</span>
                <span>₹ {shippingCharge}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax (18%)</span>
                <span>₹ {tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="font-weight-bold">Total</span>
                <h5 className="mb-0">₹ {grandTotal.toFixed(2)}</h5>
              </div>

             <button
  className="btn btn-dark btn-block rounded-pill mt-3 w-100"
  onClick={handlePayment}
  disabled={item.length === 0}
  style={{
    background: "linear-gradient(135deg, #6bc389, #3fa96a)",
    border: "none"
  }}
>
  Proceed to checkout
</button>
            </div>

            <div className="recommended-block">
              <h6 className="mb-2">Recommended for you</h6>
              <div className="recommended-scroll">
                {recommended.map((r) => (
                  <div key={r.id} className="recommended-card">
                    <div className="recommended-name">{r.name}</div>
                    <div className="recommended-price">₹ {r.price}</div>
                    <button className="recommended-add-btn">
                      Add +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
