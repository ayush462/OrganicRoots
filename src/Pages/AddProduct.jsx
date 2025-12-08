import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { OrganicRootsLoader } from "../Component/OrganicRootsLoader";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    weight: "",
  });
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.productName ||
      !product.description ||
      !product.price ||
      !product.weight
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!imgFile) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("weight", product.weight);
    formData.append("img", imgFile);

    try {
      setLoading(true);
      const res = await fetch(
        "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/product/add",
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();
      console.log("Product added:", data);

      setProduct({
        productName: "",
        description: "",
        price: "",
        weight: "",
      });
      setImgFile(null);
      setPreview(null);
      toast.success("Product added successfully!");
      navigate("/shop");
    } catch (err) {
      console.error(err);
      toast.error("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const themeBg = "radial-gradient(circle at top, #e5ffe9, #f8fff9)";
  const accentGreen = "#22c55e";
  const darkGreen = "#166534";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeBg,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1100px",
        }}
      >
        {/* Top row: back button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "16px",
          }}
        >
          <motion.button
            whileHover={{ x: -4, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "linear-gradient(135deg, #bbf7d0, #dcfce7)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              color: darkGreen,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 16px rgba(22,101,52,0.25)",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "999px",
                background: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ecfdf5",
                fontSize: "14px",
              }}
            >
              ←
            </span>
            <span>Back to Home</span>
          </motion.button>
        </div>

        <div className="row g-0 align-items-stretch">
          {/* LEFT: Organic grocery landscape / animation */}
          <div className="col-lg-5 d-none d-lg-flex">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: "24px 0 0 24px",
                padding: "24px 20px",
                background:
                  "linear-gradient(160deg, #22c55e, #16a34a, #15803d)",
                color: "#ecfdf5",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Floating shapes */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-40px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "100%",
                  background: "rgba(187, 247, 208, 0.25)",
                  filter: "blur(2px)",
                }}
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "-60px",
                  width: "220px",
                  height: "220px",
                  borderRadius: "100%",
                  background: "rgba(22, 163, 74, 0.3)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: "1.9rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  OrganicRoots Seller
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    marginTop: "6px",
                    maxWidth: "260px",
                    color: "#dcfce7",
                  }}
                >
                  Add fresh, handpicked organic groceries and make your
                  storefront greener.
                </p>

                {/* Landscape style cards */}
                <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    style={{
                      background: "rgba(22, 101, 52, 0.55)",
                      borderRadius: "16px",
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>🥬</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        Farm-fresh veggies
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "#bbf7d0",
                        }}
                      >
                        Curate seasonal greens and local produce.
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    style={{
                      background: "rgba(22, 101, 52, 0.55)",
                      borderRadius: "16px",
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>🍎</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        Orchard fruits
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "#bbf7d0",
                        }}
                      >
                        Showcase crisp, juicy, organic fruits.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom decorative row */}
              <motion.div
                style={{
                  position: "relative",
                  zIndex: 1,
                  marginTop: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  background: "rgba(15, 118, 110, 0.3)",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span>🚚 Same-day delivery slots</span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(187,247,208,0.25)",
                    fontWeight: 600,
                  }}
                >
                  Add your best picks
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Form */}
          <div className="col-lg-7 col-12">
            <motion.div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "24px",
                backgroundColor: "rgba(248, 250, 252, 0.96)",
                position: "relative",
                overflow: "hidden",
                height: "100%",
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* loader overlay only when submitting */}
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(15,23,42,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <OrganicRootsLoader />
                </div>
              )}

              <div
                className="card-body p-4 p-md-5"
                style={{
                  background:
                    "radial-gradient(circle at top, #f0fdf4, #f9fafb)",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <h3
                    style={{
                      fontWeight: 800,
                      marginBottom: "4px",
                      color: "#134e4a",
                    }}
                  >
                    Add New Product
                  </h3>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      color: "#6b7280",
                      marginBottom: "0",
                    }}
                  >
                    Fill in the details to add a new item to your organic
                    catalog.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, color: "#374151" }}
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Organic Cherry Tomatoes"
                      name="productName"
                      value={product.productName}
                      onChange={handleChange}
                      minLength={3}
                      required
                      style={{
                        borderRadius: "999px",
                        border: "1px solid #d1d5db",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, color: "#374151" }}
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write a short description: taste, source, freshness..."
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "16px",
                        border: "1px solid #d1d5db",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>

                  {/* Price & Weight */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: 600, color: "#374151" }}
                      >
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g. 79"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        style={{
                          borderRadius: "999px",
                          border: "1px solid #d1d5db",
                          fontSize: "1.5rem",
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        style={{ fontWeight: 600, color: "#374151" }}
                      >
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g. 1.0"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        style={{
                          borderRadius: "999px",
                          border: "1px solid #d1d5db",
                          fontSize: "1.5rem",
                        }}
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-3">
                    <label
                      className="form-label"
                      style={{ fontWeight: 600, color: "#374151" }}
                    >
                      Product Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      style={{
                        borderRadius: "999px",
                        border: "1px solid #d1d5db",
                        fontSize: "1.5rem",
                      }}
                    />
                    <small style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                      Supported formats: JPG, PNG, WEBP, etc.
                    </small>
                  </div>

                  {/* Preview */}
                  {preview && (
                    <div className="mb-3 text-center">
                      <p
                        className="mb-1"
                        style={{ fontSize: "0.85rem", color: "#6b7280" }}
                      >
                        Preview:
                      </p>
                      <img
                        src={preview}
                        alt="Preview"
                        style={{
                          maxWidth: "180px",
                          maxHeight: "180px",
                          borderRadius: "14px",
                          objectFit: "cover",
                          border: "1px solid rgba(148,163,184,0.7)",
                          boxShadow: "0 8px 20px rgba(15,23,42,0.1)",
                        }}
                      />
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    className="btn w-100 mt-2"
                    disabled={loading}
                    whileHover={
                      loading ? {} : { scale: 1.02, y: -1 }
                    }
                    whileTap={loading ? {} : { scale: 0.97 }}
                    style={{
                      borderRadius: "999px",
                      background: `linear-gradient(135deg, ${accentGreen}, #16a34a)`,
                      border: "none",
                      color: "#ecfdf5",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      boxShadow: "0 10px 24px rgba(34,197,94,0.5)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {loading ? "Adding..." : "Add Product"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
