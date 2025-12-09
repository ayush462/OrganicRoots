import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";
import { TiThSmallOutline } from "react-icons/ti";
import { OrganicRootsLoader } from "../OrganicRootsLoader"; // 🔹 adjust path if needed

export const ListProduct = () => {
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL"); // ALL | VEG | MEAT | FRUIT | DAIRY
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false); // 🔹 loader on category change

  // 🔹 1. Category keyword map (easy to extend)
  const CATEGORY_KEYWORDS = {
    VEG: [
      "veg",
      "vegetable",
      "tomato",
      "potato",
      "onion",
      "cabbage",
      "spinach",
      "ladyfinger",
      "brinjal",
    ],
    MEAT: ["fish", "meat", "chicken", "mutton", "egg", "prawns", "beef"],
    FRUIT: [
      "fruit",
      "apple",
      "kela",
      "banana",
      "mango",
      "orange",
      "grape",
      "berry",
      "watermelon",
      "papaya",
    ],
    DAIRY: [
      "milk",
      "paneer",
      "cheese",
      "butter",
      "curd",
      "yogurt",
      "lassi",
      "ghee",
      "cream",
    ],
  };

  // 🔹 2. "Mini AI" classifier for category based on name
  const getCategoryFromName = (name = "") => {
    const n = name.toLowerCase();

    let bestCategory = "OTHER";
    let bestScore = 0;

    Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
      let score = 0;
      keywords.forEach((word) => {
        if (n.includes(word)) score += 1;
      });

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    });

    return bestCategory;
  };

  // 🔹 3. Fetch products
  const fetchData = async () => {
    try {
      const response = await axiosFetch({
        url: "product/",
        method: "GET",
      });

      console.log("Products fetched:", response.data);

      const raw = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.content)
        ? response.data.content
        : Array.isArray(response.data.products)
        ? response.data.products
        : [];

      const withCategory = raw.map((item) => ({
        ...item,
        _category: getCategoryFromName(item.productName),
      }));

      console.log("Products with category:", withCategory);
      setData(withCategory);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 4. Apply filter
  const filteredData =
    activeFilter === "ALL"
      ? data
      : data.filter((item) => item._category === activeFilter);

  // 🔹 5. Handle filter change → show category loader
  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setCategoryLoading(true);

    // small delay to show loader
    setTimeout(() => {
      setCategoryLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <section id="products" className="section product">
        <div className="container organic-loader-container">
          <OrganicRootsLoader />
        </div>

        <style>{`
          .organic-loader-container {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section id="products" className="section product">
      <div className="container">
        {/* 🌈 Colorful Organic Category Banner */}
        <div className="category-banner-organic">
          <div className="category-banner-left">
            <p className="section-subtitle">
              <span className="leaf-dot" /> Fresh from OrganicRoots
            </p>
            <h2 className="h2 section-title">
              {activeFilter === "ALL" && "All Organic Products"}
              {activeFilter === "VEG" && "Fresh Organic Vegetables"}
              {activeFilter === "MEAT" && "Quality Meat & Fish"}
              {activeFilter === "FRUIT" && "Seasonal Organic Fruits"}
              {activeFilter === "DAIRY" && "Farm-fresh Dairy Products"}
            </h2>
            <p className="category-banner-text">
              Curated vegetables, fruits, dairy & more — filtered just for you.
            </p>

            {/* <div className="banner-chips">
              <span className="chip">Pesticide-free</span>
              <span className="chip">Handpicked daily</span>
              <span className="chip">Delivered chilled</span>
            </div> */}
          </div>

          <div className="category-banner-right">
            <div className="floating-pill pill-1">
              <span>100% Organic</span>
            </div>
            <div className="floating-pill pill-2">
              <span>Same-day Delivery</span>
            </div>
            <div className="floating-pill pill-3">
              <span>Farm to Table</span>
            </div>

            <div className="floating-circle circle-1" />
            <div className="floating-circle circle-2" />
            <div className="floating-circle circle-3" />
          </div>
        </div>

        {/* 🌿 Animated organic filter strip */}
        <div className="category-filter-wrapper">
          <ul className="filter-list organic-filter-list">
             <li>
              <button style={{marginTop:4}}
                className={`filter-btn organic-filter-btn ${
                  activeFilter === "ALL" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ALL")}
              >
                <p className="filter-text"><TiThSmallOutline size={28}>All</TiThSmallOutline></p>
              </button>
            </li>
            <li>
              <button
                className={`filter-btn organic-filter-btn ${
                  activeFilter === "VEG" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("VEG")}
              >
                <span className="filter-icon">
                  <img
                    src="./images/filter-1.png"
                    width={20}
                    alt=""
                    className="default"
                  />
                  <img
                    src="./images/filter-1-active.png"
                    width={20}
                    alt=""
                    className="color"
                  />
                </span>
                <p className="filter-text">Fresh Vegetables</p>
              </button>
            </li>

            <li>
              <button
                className={`filter-btn organic-filter-btn ${
                  activeFilter === "MEAT" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("MEAT")}
              >
                <span className="filter-icon">
                  <img
                    src="./images/filter-2.png"
                    width={20}
                    alt=""
                    className="default"
                  />
                  <img
                    src="./images/filter-2-active.png"
                    width={20}
                    alt=""
                    className="color"
                  />
                </span>
                <p className="filter-text">Fish &amp; Meat</p>
              </button>
            </li>

            <li>
              <button
                className={`filter-btn organic-filter-btn ${
                  activeFilter === "FRUIT" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("FRUIT")}
              >
                <span className="filter-icon">
                  <img
                    src="./images/filter-3.png"
                    width={20}
                    alt=""
                    className="default"
                  />
                  <img
                    src="./images/filter-3-active.png"
                    width={20}
                    alt=""
                    className="color"
                  />
                </span>
                <p className="filter-text">Healthy Fruit</p>
              </button>
            </li>

            <li>
              <button
                className={`filter-btn organic-filter-btn ${
                  activeFilter === "DAIRY" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("DAIRY")}
              >
                <span className="filter-icon">
                  <img
                    src="./images/filter-1.png"
                    width={20}
                    alt=""
                    className="default"
                  />
                  <img
                    src="./images/filter-1-active.png"
                    width={20}
                    alt=""
                    className="color"
                  />
                </span>
                <p className="filter-text">Dairy Products</p>
              </button>
            </li>

            {/* Show all */}
           
          </ul>
        </div>

        {/* 🌿 Products / Category loader / Empty state */}
        {categoryLoading ? (
          <div className="category-loader-wrapper">
            <OrganicRootsLoader />
          </div>
        ) : (
          <ul className="grid-list">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ProductCard
                  key={item.productId}
                  id={item.productId}
                  name={item.productName}
                  description={item.description}
                  price={item.price}
                  img={item.img}
                />
              ))
            ) : (
              <li className="empty-state-wrapper">
                <div className="empty-state">
                  <div className="empty-character">
                    <div className="head">
                      <div className="eye eye-left" />
                      <div className="eye eye-right" />
                      <div className="tear tear-left" />
                      <div className="tear tear-right" />
                      <div className="mouth" />
                    </div>
                    <div className="body">
                      <div className="arm arm-left" />
                      <div className="arm arm-right" />
                      <div className="basket">
                        <div className="basket-handle" />
                        <div className="basket-body" />
                      </div>
                    </div>
                  </div>
                  <h3 className="empty-title">Opps...</h3>
                  <p className="empty-text">
                    No fresh items are available in this category at the moment.
                  </p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* 🌈 Organic banner + filter + empty-state styles */}
      <style>{`
        .category-banner-organic {
          margin-bottom: 24px;
          padding: 18px 20px;
          border-radius: 20px;
          background: linear-gradient(120deg, #d9ffe7, #fff6d9, #ffe4c9);
          background-size: 200% 200%;
          animation: bannerGradientMove 10s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 14px 36px rgba(42, 105, 68, 0.2);
          z-index: 0;
          margin-top: 20px;
        }

        .category-banner-organic::before {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at top, rgba(255, 255, 255, 0.7), transparent 60%);
          opacity: 0.5;
          mix-blend-mode: soft-light;
          animation: bannerGlow 7s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes bannerGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes bannerGlow {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }

        .category-banner-left .section-subtitle {
          margin-bottom: 4px;
          font-weight: 600;
          color: #2f6f46;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .leaf-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6bc389, #3fa96a);
          box-shadow: 0 0 0 6px rgba(107, 195, 137, 0.35);
        }

        .category-banner-text {
          margin: 4px 0 0;
          font-size: 13px;
          color: #3d5145;
        }

        .banner-chips {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .banner-chips .chip {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          color: #2f6f46;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
        }

        .category-banner-right {
          position: relative;
          min-width: 210px;
          height: 100px;
        }

        .floating-pill {
          position: absolute;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          font-size: 11px;
          font-weight: 600;
          color: #2f6f46;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: float-pill 4s ease-in-out infinite;
        }

        .pill-1 {
          top: 4px;
          right: 20px;
        }

        .pill-2 {
          bottom: 4px;
          left: 10px;
          animation-delay: 0.8s;
        }

        .pill-3 {
          top: 32px;
          left: 65px;
          animation-delay: 1.4s;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(63, 169, 106, 0.4);
          animation: float-circle 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 46px;
          height: 46px;
          top: -10px;
          left: 28px;
        }

        .circle-2 {
          width: 28px;
          height: 28px;
          right: 6px;
          bottom: -4px;
          animation-delay: 1s;
        }

        .circle-3 {
          width: 34px;
          height: 34px;
          right: 60px;
          top: 40px;
          animation-delay: 1.8s;
        }

        @keyframes float-pill {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @keyframes float-circle {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.06); }
          100% { transform: translateY(0) scale(1); }
        }

        .category-filter-wrapper {
          margin-bottom: 18px;
        }

        .organic-filter-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(239, 252, 244, 0.95);
          box-shadow: inset 0 0 0 1px rgba(63, 169, 106, 0.12);
        }

        .organic-filter-btn {
          border-radius: 999px;
          border: none;
          padding: 6px 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #345842;
          position: relative;
          overflow: hidden;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .organic-filter-btn .filter-icon img.color {
          display: none;
        }

        .organic-filter-btn .filter-icon img.default {
          display: block;
        }

        .organic-filter-btn.active .filter-icon img.default {
          display: none;
        }

        .organic-filter-btn.active .filter-icon img.color {
          display: block;
        }

        .organic-filter-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6bc389, #3fa96a);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: -1;
        }

        .organic-filter-btn.active {
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(63, 169, 106, 0.35);
        }

        .organic-filter-btn.active::before {
          opacity: 1;
        }

        .organic-filter-btn:hover:not(.active) {
          background: rgba(111, 195, 137, 0.08);
          transform: translateY(-1px);
        }

        .filter-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filter-text {
          margin: 0;
          white-space: nowrap;
        }

        .category-loader-wrapper {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 600px) {
          .category-banner-organic {
            flex-direction: column;
            align-items: flex-start;
          }

          .category-banner-right {
            align-self: stretch;
          }

          .organic-filter-list {
            border-radius: 14px;
          }
        }

        /* 😢 Cartoon empty state styles */
        .empty-state-wrapper {
          list-style: none;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .empty-state {
          max-width: 320px;
          margin: 24px auto 32px;
          text-align: center;
          padding: 20px 16px 8px;
          border-radius: 18px;
          background: radial-gradient(circle at top, #f7fff9, #ffffff);
          box-shadow: 0 10px 26px rgba(42, 105, 68, 0.15);
        }

        .empty-character {
          position: relative;
          height: 130px;
          margin-bottom: 10px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: empty-bounce 2.8s ease-in-out infinite;
        }

        .empty-character .head {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #ffe1c4;
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .eye {
          position: absolute;
          top: 26px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #333;
        }

        .eye-left {
          left: 18px;
        }

        .eye-right {
          right: 18px;
        }

        .tear {
          position: absolute;
          top: 34px;
          width: 6px;
          height: 12px;
          border-radius: 50%;
          background: rgba(111, 195, 237, 0.95);
          animation: tear-drop 1.6s ease-in-out infinite;
        }

        .tear-left {
          left: 16px;
        }

        .tear-right {
          right: 16px;
          animation-delay: 0.4s;
        }

        .mouth {
          position: absolute;
          bottom: 16px;
          left: 50%;
          width: 26px;
          height: 18px;
          border-radius: 0 0 26px 26px;
          border-bottom: 3px solid #c04b4b;
          transform: translateX(-50%);
        }

        .body {
          position: absolute;
          bottom: 0;
          width: 90px;
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .arm {
          position: absolute;
          top: 24px;
          width: 34px;
          height: 10px;
          border-radius: 10px;
          background: #ffe1c4;
        }

        .arm-left {
          left: -14px;
          transform-origin: right center;
          transform: rotate(-18deg);
        }

        .arm-right {
          right: -14px;
          transform-origin: left center;
          transform: rotate(18deg);
        }

        .basket {
          position: absolute;
          bottom: 0;
          width: 70px;
          height: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .basket-handle {
          width: 56px;
          height: 20px;
          border-radius: 999px;
          border: 3px solid #c3873b;
          border-bottom: none;
        }

        .basket-body {
          margin-top: -4px;
          width: 70px;
          height: 26px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f1b768, #d98a36);
          box-shadow: 0 6px 10px rgba(0,0,0,0.18);
        }

        .empty-title {
          font-size: 17px;
          font-weight: 600;
          color: #23452c;
          margin-bottom: 4px;
        }

        .empty-text {
          font-size: 13px;
          color: #547260;
        }

        @keyframes empty-bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @keyframes tear-drop {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
};
