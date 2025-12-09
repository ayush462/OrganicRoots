// src/Pages/OrderSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    amount = "0.00",
    eta = "25-30 mins",
    deliveryPartner = "Organic Roots Rider",
    razorpayPaymentId,
  } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "24px 12px",
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 18px 40px rgba(34, 197, 94, 0.35)",
          padding: "20px 20px 24px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* organic leaves glow */}
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, #4ade80 0%, transparent 60%)",
            top: "-60px",
            right: "-60px",
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, #22c55e 0%, transparent 60%)",
            bottom: "-40px",
            left: "-40px",
            opacity: 0.18,
          }}
        />

        {/* Header + Check animation */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
            }}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "999px",
              margin: "0 auto 12px auto",
              background:
                "conic-gradient(from 180deg, #22c55e, #4ade80, #86efac, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 24px rgba(22, 163, 74, 0.45)",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "999px",
                background: "#ecfdf3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "30px",
                  color: "#16a34a",
                }}
              >
                ✓
              </motion.span>
            </div>
          </motion.div>

          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              marginBottom: "4px",
              color: "#14532d",
            }}
          >
            Order placed successfully!
          </h2>
          <p style={{ color: "#166534", fontSize: "13px", marginBottom: "4px" }}>
            Your fresh & organic groceries are on their way 🌱
          </p>
          <p style={{ color: "#16a34a", fontSize: "12px", marginBottom: "12px" }}>
            ETA: <strong>{eta}</strong>
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "#ecfdf3",
              fontSize: "12px",
              color: "#166534",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                background: "#22c55e",
              }}
            />
            <span>Order amount: ₹ {amount}</span>
          </div>

          {razorpayPaymentId && (
            <p
              style={{
                fontSize: "10px",
                color: "#6b7280",
                marginTop: "-6px",
                marginBottom: "12px",
              }}
            >
              Payment Id: <strong>{razorpayPaymentId}</strong>
            </p>
          )}
        </div>

        {/* Map + delivery partner card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "4px",
          }}
        >
          {/* Fake organic-styled map */}
          <div
            style={{
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #ecfdf3 0%, #bbf7d0 40%, #a7f3d0 100%)",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #bbf7d0",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#166534",
                marginBottom: "10px",
              }}
            >
              Live delivery route
            </p>

            {/* Simple route visualization */}
            <div
              style={{
                position: "relative",
                height: "120px",
                borderRadius: "14px",
                background:
                  "linear-gradient(125deg, #f9fafb 0%, #ecfdf3 40%, #fefce8 100%)",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              {/* road path */}
              <svg
                viewBox="0 0 220 120"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* route line */}
                <path
                  d="M10 100 C 60 80 80 40 120 50 C 160 60 180 30 210 20"
                  fill="none"
                  stroke="#15803d"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="6 8"
                />

                {/* origin pin */}
                <circle cx="10" cy="100" r="6" fill="#22c55e" />
                <text
                  x="16"
                  y="96"
                  fontSize="9"
                  fill="#166534"
                  fontWeight="600"
                >
                  Store
                </text>

                {/* destination pin */}
                <circle cx="210" cy="20" r="6" fill="#16a34a" />
                <text
                  x="190"
                  y="14"
                  fontSize="9"
                  fill="#166534"
                  fontWeight="600"
                >
                  You
                </text>
              </svg>

              {/* moving rider icon */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: ["0%", "65%", "90%"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "54px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "999px",
                      background: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 14px rgba(34, 197, 94, 0.5)",
                      fontSize: "14px",
                      color: "#f0fdf4",
                    }}
                  >
                    🛵
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "999px",
                      background: "#ecfdf3",
                      color: "#166534",
                    }}
                  >
                    On the way
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Delivery partner info */}
          <div
            style={{
              borderRadius: "16px",
              padding: "10px 12px",
              background: "#ecfdf3",
              border: "1px solid #bbf7d0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                background:
                  "linear-gradient(145deg, #22c55e, #16a34a, #4ade80)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ecfdf3",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              R
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#14532d",
                  marginBottom: "2px",
                }}
              >
                {deliveryPartner}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#15803d",
                  marginBottom: "2px",
                }}
              >
                Your delivery partner from Organic Roots
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#16a34a",
                  marginBottom: 0,
                }}
              >
                Keeping your veggies fresh & chemical-free 🌿
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "4px",
            }}
          >
            <button
              onClick={() => navigate("/")}
              style={{
                flex: 1,
                border: "none",
                borderRadius: "999px",
                padding: "10px 12px",
                fontSize: "13px",
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, #22c55e, #16a34a, #22c55e)",
                color: "#ecfdf3",
                boxShadow: "0 8px 18px rgba(22, 163, 74, 0.45)",
                cursor: "pointer",
              }}
            >
              Back to home
            </button>
            <button
              onClick={() => navigate(-1)}
              style={{
                flexBasis: "38%",
                borderRadius: "999px",
                padding: "10px 10px",
                fontSize: "12px",
                fontWeight: 500,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#15803d",
                cursor: "pointer",
              }}
            >
              View more orders
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
