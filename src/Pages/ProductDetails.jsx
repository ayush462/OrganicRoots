import React, { useEffect, useState } from "react";
import { Header } from "../Component/Header";
import { Footer } from "../Component/Footer";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { OrganicRootsLoader } from "../Component/OrganicRootsLoader";
import { motion } from "framer-motion";

export const ProductDetails = () => {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [token] = useState(sessionStorage.getItem("token"));
  const { id } = useParams();

  const handleQuantity = (e) => {
    const val = Number(e.target.value);
    if (!Number.isNaN(val) && val > 0) setQuantity(val);
  };

  const handleMinus = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handlePlus = () => {
    setQuantity((q) => q + 1);
  };



  const handleCart = async () => {
    if (!data || !data.productId) return;

    const res = await fetch(`http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/cart/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: data.productId,
        quantity,
      }),
    });

    if (res.status === 200) {
      toast.success("Product added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      const err = await res.text();
      console.error("Add to cart failed:", res.status, err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fatchData = async () => {
      const response = await fetch(`http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/product/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const res = await response.json();
      setData(res);
    };

    fatchData();
  }, [id, token]);

  if (!data) {
    return (
      <>
        <Header />
        <div className="organic-loader-wrapper">
          <OrganicRootsLoader />
        </div>
        <Footer />

        <style>{`
          .organic-loader-wrapper {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="pd-page-wrapper">
        <div className="pd-bg-orb orb-1" />
        <div className="pd-bg-orb orb-2" />
        <div className="pd-bg-orb orb-3" />

        <div className="container">
          <motion.div
            className="pd-main-card row g-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* LEFT: IMAGE + BADGE */}
            <div className="col-md-5 pd-left-col">
              <motion.div
                className="pd-img-shell"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="pd-img-circle" />
                <img
                  src={`data:image/png;base64,${data.img}`}
                  alt={data.productName}
                  className="pd-img"
                />

                <div className="pd-badge-main">
                  <span className="leaf-icon">🌿</span>
                  100% Organic
                </div>

                <div className="pd-badge-secondary">
                  Freshly picked today
                </div>
              </motion.div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="col-md-7 pd-right-col">
              <div className="pd-right-inner">
                <div className="pd-tags-row">
                  <span className="pd-tag">OrganicRoots</span>
                  <span className="pd-tag pd-tag-soft">Farm-to-door</span>
                </div>

                <h1 className="pd-title">{data.productName}</h1>

                <div className="pd-rating-row">
                  <div className="stars">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-o" />
                  </div>
                  <span className="pd-rating-text">4.8 · 120+ reviews</span>
                </div>

                <div className="pd-price-row">
                  <div>
                    <div className="pd-price-main">₹ {data.price}</div>
                    <div className="pd-price-sub">
                      <span className="pd-price-cut">
                        ₹ {data.price + 100}
                      </span>
                      <span className="pd-discount-pill">Save ₹100</span>
                    </div>
                  </div>
                  <div className="pd-delivery-pill">
                    🚚 Free delivery on orders above ₹299
                  </div>
                </div>

                <p className="pd-desc">{data.description}</p>

                <div className="pd-benefits-row">
                  <div className="pd-benefit-pill">No pesticides</div>
                  <div className="pd-benefit-pill">Locally sourced</div>
                  <div className="pd-benefit-pill">Hand sorted</div>
                </div>

                <div className="pd-qty-cart-row">
                  <div className="pd-qty-block">
                    <span className="pd-qty-label">Quantity</span>
                    <div className="pd-qty-controls">
                      <button type="button" onClick={handleMinus}>
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantity}
                      />
                      <button type="button" onClick={handlePlus}>
                        +
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    className="pd-cart-btn"
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCart}
                  >
                    Add to Cart
                    <span className="pd-cart-icon">🛒</span>
                  </motion.button>
                </div>

                <div className="pd-meta-row">
                  <span>✅ Quality checked</span>
                  <span>🌍 Eco-friendly packaging</span>
                  <span>⏱ Delivered in under 2 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      <style>{`
        .pd-page-wrapper {
          position: relative;
          min-height: 80vh;
          padding: 40px 0 60px;
          background: radial-gradient(circle at top, #e8fff2, #f7fff9, #ffffff);
          overflow: hidden;
        }

        .pd-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(0);
          opacity: 0.4;
          z-index: 0;
        }

        .orb-1 {
          width: 220px;
          height: 220px;
          top: -60px;
          left: -40px;
          background: radial-gradient(circle, #a8e5c0, transparent);
        }

        .orb-2 {
          width: 180px;
          height: 180px;
          bottom: -80px;
          right: 40px;
          background: radial-gradient(circle, #ffe4b3, transparent);
        }

        .orb-3 {
          width: 140px;
          height: 140px;
          top: 50%;
          right: 20%;
          background: radial-gradient(circle, #b7f3dd, transparent);
        }

        .pd-main-card {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          padding: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(239,252,244,0.9));
          box-shadow: 0 20px 50px rgba(27, 77, 50, 0.2);
          backdrop-filter: blur(10px);
        }

        .pd-left-col, .pd-right-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pd-img-shell {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pd-img-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at top, #a8e5c0, #6bc389, #3fa96a);
          opacity: 0.7;
          box-shadow: 0 20px 35px rgba(26, 89, 53, 0.4);
          animation: pulseGlow 6s ease-in-out infinite;
        }

        .pd-img {
          position: relative;
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));
        }

        .pd-badge-main {
          position: absolute;
          top: 10px;
          left: 12px;
          background: rgba(255,255,255,0.95);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          color: #235235;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 18px rgba(0,0,0,0.18);
        }

        .leaf-icon {
          font-size: 14px;
        }

        .pd-badge-secondary {
          position: absolute;
          bottom: 12px;
          right: 10px;
          background: rgba(255,255,255,0.9);
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          color: #387c55;
        }

        .pd-right-inner {
          padding: 16px 14px 16px 24px;
        }

        .pd-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .pd-tag {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          background: #e6f9ee;
          color: #276645;
          font-weight: 600;
        }

        .pd-tag-soft {
          background: #fff4df;
          color: #a0681f;
        }

        .pd-title {
          font-size: 26px;
          font-weight: 800;
          color: #234431;
          margin-bottom: 6px;
        }

        .pd-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .stars i {
          color: #f8b400;
          margin-right: 2px;
        }

        .pd-rating-text {
          font-size: 12px;
          color: #577263;
        }

        .pd-price-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 12px;
        }

        .pd-price-main {
          font-size: 28px;
          font-weight: 800;
          color: #2d6f48;
        }

        .pd-price-sub {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 3px;
        }

        .pd-price-cut {
          text-decoration: line-through;
          color: #9a9a9a;
          font-size: 13px;
        }

        .pd-discount-pill {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 999px;
          background: #e3ffe9;
          color: #1f6a3a;
          font-weight: 600;
        }

        .pd-delivery-pill {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          color: #316647;
          box-shadow: 0 3px 8px rgba(0,0,0,0.08);
          max-width: 200px;
        }

        .pd-desc {
          font-size: 14px;
          color: #476654;
          margin-bottom: 10px;
        }

        .pd-benefits-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .pd-benefit-pill {
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 999px;
          background: #f3fff7;
          border: 1px solid #daf5e4;
          color: #2e6544;
        }

        .pd-qty-cart-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          margin-bottom: 12px;
        }

        .pd-qty-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pd-qty-label {
          font-size: 12px;
          color: #536c5d;
        }

        .pd-qty-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f4fbf7;
          border-radius: 999px;
          padding: 4px 6px;
          border: 1px solid #d5f0df;
        }

        .pd-qty-controls button {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: #3fa96a;
          color: #ffffff;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pd-qty-controls input {
          width: 48px;
          border: none;
          background: transparent;
          text-align: center;
          font-size: 14px;
          outline: none;
        }

        .pd-cart-btn {
          flex: 1;
          min-width: 180px;
          border: none;
          border-radius: 999px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #6bc389, #3fa96a);
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(63,169,106,0.4);
          transition: box-shadow 0.2s ease;
        }

        .pd-cart-btn:hover {
          box-shadow: 0 16px 32px rgba(63,169,106,0.5);
        }

        .pd-cart-icon {
          font-size: 16px;
        }

        .pd-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 11px;
          color: #607a6a;
          margin-top: 4px;
        }

        .pd-meta-row span::before {
          content: "• ";
          margin-right: 2px;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }

        @media (max-width: 768px) {
          .pd-main-card {
            padding: 14px;
          }

          .pd-right-inner {
            padding: 18px 6px 4px 6px;
          }

          .pd-title {
            font-size: 22px;
          }

          .pd-price-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};
