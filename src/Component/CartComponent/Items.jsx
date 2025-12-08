// src/Component/CartComponent/Items.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export const Items = ({ prop, setLoading }) => {
  const [quantity, setQuantity] = useState(prop.quantity);
  const token = sessionStorage.getItem("token");
  const item2 = prop.product;



  const updateQuantity = async (q) => {
    if (!q || !prop.product.productId) return;

    const res = await fetch(`http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/cart/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: prop.product.productId,
        quantity: q,
      }),
    });

    if (res.ok) {
      setLoading((prev) => prev + 1);
      toast.success("Cart updated successfully!");
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  const handleQuantityChange = (e) => {
    const q = Number(e.target.value);
    setQuantity(q);
    updateQuantity(q);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      const newQ = quantity - 1;
      setQuantity(newQ);
      updateQuantity(newQ);
    }
  };

  const handlePlus = () => {
    const newQ = quantity + 1;
    setQuantity(newQ);
    updateQuantity(newQ);
  };

  const handleRemove = async () => {
    const res = await fetch(
      `http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/cart/product/${prop.product.productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (res.ok) {
      setLoading((prev) => prev + 1);
      toast.success("Item removed from cart!");
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  // -------------------------------
  // 🌿 Organica Grocery Theme Styles
  // -------------------------------
  const themeGreen = "#2e7d32"; // main theme color
  const themeDarkGreen = "#1b5e20";
  const softGreenBg = "#e8f5e9";

  const cardStyle = {
    display: "flex",
    background: "#fff",
    borderRadius: "14px",
    padding: "14px",
    gap: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "14px",
    border: "1px solid #e0e0e0",
  };

  const imgStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "1px solid #c8e6c9",
    background: softGreenBg,
  };

  const nameStyle = {
    fontSize: "1.55rem",
    fontWeight: 700,
    color: themeDarkGreen,
    margin: 0,
    marginTop: "8px",
  };

  const descStyle = {
    fontSize: "1.1rem",
    margin: "4px 0",
    color: "#4f5f4f",
  };

  const priceStyle = {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginTop: "4px",
    color: themeGreen,
  };

  const qtyBtnStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    background: softGreenBg,
    color: themeDarkGreen,
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.10)",
  };

  const qtyInputStyle = {
    width: "48px",
    textAlign: "center",
    borderRadius: "20px",
    border: "1px solid #bdbdbd",
    padding: "4px 0",
    fontSize: "0.95rem",
  };

  const removeBtnStyle = {
    background: themeGreen,
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: "8px",
  };

  // right column for qty + remove
  const actionColumnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: "6px",
    minWidth: "120px",
  };

  const qtyRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <>
      <div style={cardStyle}>
        {/* Image */}
        <img
          src={`data:image/png;base64,${item2.img}`}
          alt={item2.productName}
          style={imgStyle}
        />

        {/* Middle content + right actions */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          {/* Product text */}
          <div style={{ flex: 1, paddingRight: "4px" }}>
            <h6 style={nameStyle}>{item2.productName}</h6>
            <p style={descStyle}>{item2.description}</p>
            <p style={priceStyle}>₹ {item2.price}</p>
          </div>

          {/* Right side: qty buttons + remove button */}
          <div style={actionColumnStyle}>
            <div style={qtyRowStyle}>
              <button style={qtyBtnStyle} onClick={handleMinus}>
                −
              </button>

              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                style={qtyInputStyle}
              />

              <button style={qtyBtnStyle} onClick={handlePlus}>
                +
              </button>
            </div>

            <button style={removeBtnStyle} onClick={handleRemove}>
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
