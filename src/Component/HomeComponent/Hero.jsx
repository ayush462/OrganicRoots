import React from "react";
import { Link } from "react-router-dom";


export const Hero = () => {
  return (
    <>
      <style>{`
        :root {
          --green: #2ecc71;
          --dark-green: #1e7b4b;
          --bg: #f4fbf6;
          --orange: #ffa726;
          --text-dark: #102a43;
        }

        .hero {
          position: relative;
          min-height: 88vh;
          padding: 5rem 1.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top left, #e9f7ef 0, #f4fbf6 40%, #ffffff 100%);
          overflow: hidden;
        }

        /* soft blobs in background */
        .hero::before,
        .hero::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.7;
          pointer-events: none;
        }

        .hero::before {
          width: 380px;
          height: 380px;
          top: -80px;
          left: -120px;
          background: radial-gradient(circle, rgba(46, 204, 113, 0.3), transparent 60%);
          animation: heroBlob1 18s ease-in-out infinite alternate;
        }

        .hero::after {
          width: 420px;
          height: 420px;
          bottom: -120px;
          right: -140px;
          background: radial-gradient(circle, rgba(255, 167, 38, 0.25), transparent 65%);
          animation: heroBlob2 20s ease-in-out infinite alternate;
        }

        @keyframes heroBlob1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(40px, 50px, 0) scale(1.1); }
        }

        @keyframes heroBlob2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-40px, -60px, 0) scale(1.15); }
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
          gap: 3.5rem;
          align-items: center;
        }

        /* LEFT SIDE (TEXT) */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .hero-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          align-items: center;
        }

        .hero-chip-main {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(46, 204, 113, 0.21);
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--dark-green);
          font-weight: 600;
          box-shadow: 0 12px 30px rgba(15, 81, 50, 0.12);
          animation: chipPulse 4.2s ease-in-out infinite;
        }

        .hero-chip-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: conic-gradient(from 140deg, #2ecc71, #ffa726, #2ecc71);
        }

        .hero-chip-secondary {
          font-size: 0.84rem;
          color: #5f7484;
        }

        @keyframes chipPulse {
          0% { transform: translateY(0) scale(1); box-shadow: 0 12px 30px rgba(15, 81, 50, 0.12); }
          50% { transform: translateY(-2px) scale(1.03); box-shadow: 0 18px 40px rgba(15, 81, 50, 0.18); }
          100% { transform: translateY(0) scale(1); box-shadow: 0 12px 30px rgba(15, 81, 50, 0.12); }
        }

        .hero-title {
          font-size: clamp(3.1rem, 4vw + 2rem, 4.6rem);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: var(--text-dark);
        }

        .hero-title-highlight {
          position: relative;
          display: inline-block;
          padding: 0 0.1em;
          color: var(--dark-green);
        }

        .hero-title-highlight::before {
          content: "";
          position: absolute;
          inset: 55% -6px -4px -6px;
          background: linear-gradient(90deg, rgba(46,204,113,0.18), rgba(129,199,132,0.25));
          border-radius: 999px;
          z-index: -1;
        }

        .hero-text {
          font-size: 1.05rem;
          color: #4f5b62;
          max-width: 520px;
        }

        .hero-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.7rem;
          margin-top: 0.4rem;
        }

        .hero-stat {
          min-width: 120px;
        }

        .hero-stat-value {
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .hero-stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8193a2;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.8rem;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          color: #ffffff;
          padding: 1rem 2.2rem;
          border-radius: 999px;
          font-weight: 700;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 1rem;
          letter-spacing: 0.03em;
          box-shadow: 0 18px 40px rgba(39, 174, 96, 0.45);
          transform-origin: center;
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
        }

        .hero-btn-primary span.icon {
          font-size: 1.2rem;
          margin-left: 0.15rem;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 22px 55px rgba(39, 174, 96, 0.55);
          filter: brightness(1.03);
        }

        .hero-btn-primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 10px 26px rgba(39, 174, 96, 0.4);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.95rem 1.7rem;
          border-radius: 999px;
          border: 1px solid rgba(16, 42, 67, 0.1);
          background: rgba(255, 255, 255, 0.9);
          color: #34526a;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 10px 26px rgba(15, 81, 50, 0.06);
        }

        .hero-btn-ghost-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffa726, #fb8c00);
        }

        .hero-btn-ghost:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(15, 81, 50, 0.12);
        }

        .hero-note {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.86rem;
          color: #90a4ae;
          margin-top: 0.5rem;
        }

        .hero-note-pill {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffa726, #ffca28);
        }

        /* RIGHT SIDE – 3D SCENE */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-scene-wrapper {
          perspective: 1400px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .hero-scene {
          position: relative;
          width: min(480px, 95vw);
          transform-style: preserve-3d;
          transform: rotateY(-18deg) rotateX(10deg);
          animation: sceneFloat 9s ease-in-out infinite alternate;
        }

        @keyframes sceneFloat {
          0% { transform: rotateY(-18deg) rotateX(10deg) translateY(0); }
          50% { transform: rotateY(-14deg) rotateX(13deg) translateY(-10px); }
          100% { transform: rotateY(-20deg) rotateX(8deg) translateY(4px); }
        }

        .hero-card-main {
          position: relative;
          width: 100%;
          border-radius: 32px;
          background: linear-gradient(150deg, #ffffff 0%, #e9f7ef 40%, #e3f2fd 100%);
          box-shadow:
            0 30px 80px rgba(15, 81, 50, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.6);
          padding: 1.4rem 1.5rem 1.6rem;
          transform: translateZ(40px);
        }

        .hero-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }

        .hero-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2933;
        }

        .hero-card-pill {
          font-size: 0.78rem;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          background: rgba(46, 204, 113, 0.1);
          color: var(--dark-green);
          font-weight: 600;
        }

        .hero-card-subtitle {
          font-size: 0.82rem;
          color: #5f7484;
          margin-bottom: 0.8rem;
        }

        .hero-card-body {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 0.9rem;
          align-items: center;
        }

        .hero-card-img-wrap {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: radial-gradient(circle at 25% 15%, #ffffff 0, #e8f5e9 55%, #c8e6c9 100%);
          padding: 0.4rem;
        }

        .hero-card-img-inner {
          border-radius: 20px;
          background: radial-gradient(circle at 20% 10%, #ffffff 0, #f1f8e9 45%, #e0f2f1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem;
          position: relative;
        }

        .hero-card-img-inner::after {
          content: "";
          position: absolute;
          inset: 20%;
          border-radius: 40%;
          background: radial-gradient(circle, rgba(46,204,113,0.18), transparent 70%);
          filter: blur(2px);
        }

        .hero-main-img {
          position: relative;
          z-index: 2;
          width: 120%;
          height: 120%;
          object-fit: contain;
          filter: drop-shadow(0 22px 25px rgba(15, 81, 50, 0.5));
          transform: translateY(4px);
          animation: basketFloat 4.5s ease-in-out infinite alternate;
        }

        @keyframes basketFloat {
          0% { transform: translateY(4px) scale(1); }
          100% { transform: translateY(-10px) scale(1.03); }
        }

        .hero-card-pills-bottom {
          position: absolute;
          bottom: 0.45rem;
          left: 0.6rem;
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          z-index: 3;
        }

        .hero-mini-pill {
          font-size: 0.7rem;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          color: #1e7b4b;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.07);
        }

        .hero-card-right {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .hero-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .hero-price-main {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .hero-price-old {
          font-size: 0.9rem;
          color: #9e9e9e;
          text-decoration: line-through;
        }

        .hero-price-tag {
          font-size: 0.8rem;
          color: #fb8c00;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: rgba(255, 183, 77, 0.15);
        }

        .hero-list {
          font-size: 0.82rem;
          color: #546e7a;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .hero-list-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .hero-list-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
        }

        .hero-card-cta {
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }

        .hero-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.2rem;
          border-radius: 999px;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          background: var(--dark-green);
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(15, 81, 50, 0.45);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .hero-card-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(15, 81, 50, 0.55);
        }

        .hero-card-stock {
          font-size: 0.76rem;
          color: #78909c;
        }

        .hero-card-stock-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #66bb6a;
          display: inline-block;
          margin-right: 0.25rem;
        }

        /* floating 3D badges around card */
        .hero-floating-badge {
          position: absolute;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transform-style: preserve-3d;
        }

        .hero-floating-badge span.icon {
          font-size: 1.1rem;
        }

        .hero-badge-top {
          top: -20px;
          right: 40px;
          transform: translateZ(80px);
          animation: floatBadge1 8s ease-in-out infinite alternate;
        }

        .hero-badge-left {
          bottom: 10px;
          left: -25px;
          transform: translateZ(60px);
          animation: floatBadge2 7.5s ease-in-out infinite alternate;
        }

        .hero-badge-right {
          top: 40%;
          right: -30px;
          transform: translateZ(70px);
          animation: floatBadge3 7s ease-in-out infinite alternate;
        }

        @keyframes floatBadge1 {
          0% { transform: translate3d(0,0,80px); }
          100% { transform: translate3d(-8px, 10px, 80px); }
        }

        @keyframes floatBadge2 {
          0% { transform: translate3d(0,0,60px); }
          100% { transform: translate3d(8px, -10px, 60px); }
        }

        @keyframes floatBadge3 {
          0% { transform: translate3d(0,0,70px); }
          100% { transform: translate3d(-10px, -6px, 70px); }
        }

        /* floating fruits (emoji spheres) */
        .hero-fruit {
          position: absolute;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          background: radial-gradient(circle at 30% 20%, #ffffff 0, #ffe0b2 55%, #ffb74d 100%);
          box-shadow: 0 14px 30px rgba(0,0,0,0.12);
          transform-style: preserve-3d;
        }

        .hero-fruit.apple {
          top: -10px;
          left: 12%;
          transform: translateZ(90px);
          animation: fruitOrbit1 9s ease-in-out infinite alternate;
        }

        .hero-fruit.leaf {
          bottom: -14px;
          right: 14%;
          transform: translateZ(90px);
          background: radial-gradient(circle at 30% 20%, #ffffff 0, #c8e6c9 55%, #81c784 100%);
          animation: fruitOrbit2 8s ease-in-out infinite alternate;
        }

        .hero-fruit.carrot {
          top: 55%;
          left: -10px;
          transform: translateZ(85px);
          background: radial-gradient(circle at 30% 20%, #ffffff 0, #ffe082 55%, #ffca28 100%);
          animation: fruitOrbit3 7.5s ease-in-out infinite alternate;
        }

        @keyframes fruitOrbit1 {
          0% { transform: translate3d(0,0,90px) rotate(0deg); }
          100% { transform: translate3d(-8px, 10px,90px) rotate(7deg); }
        }

        @keyframes fruitOrbit2 {
          0% { transform: translate3d(0,0,90px) rotate(0deg); }
          100% { transform: translate3d(10px,-8px,90px) rotate(-7deg); }
        }

        @keyframes fruitOrbit3 {
          0% { transform: translate3d(0,0,85px) rotate(0deg); }
          100% { transform: translate3d(8px,-6px,85px) rotate(5deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-left {
            order: 2;
            align-items: center;
            text-align: center;
          }

          .hero-text {
            max-width: 100%;
          }

          .hero-stats-row{
           display:  none;
          }
          .hero-actions,
          .hero-note {
            justify-content: center;
          }

          .hero-right {
            order: 1;
          }

          .hero-card-right{
          display: none;
          }

          .hero-scene {
            transform: rotateY(-10deg) rotateX(10deg);
          }

          @keyframes sceneFloat {
            0% { transform: rotateY(-10deg) rotateX(10deg) translateY(0); }
            50% { transform: rotateY(-6deg) rotateX(13deg) translateY(-10px); }
            100% { transform: rotateY(-12deg) rotateX(8deg) translateY(4px); }
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 4.2rem 1.3rem 2.4rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-chip-main {
            font-size: 0.8rem;
          }

          .hero-scene {
            width: min(380px, 100%);
          }

          .hero-fruit {
            width: 46px;
            height: 46px;
            font-size: 1.2rem;
          }

          .hero-floating-badge {
            font-size: 0.74rem;
            padding: 0.45rem 0.75rem;
          }

          .hero-card-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-inner">
          {/* LEFT: TEXT SIDE */}
          <div className="hero-left">
            <div className="hero-chip-row">
              <div className="hero-chip-main">
                <span className="hero-chip-dot" />
                ORGANIC ROOTS • FRESH DAILY
              </div>
              <span className="hero-chip-secondary">
                100% pesticide-free, traceable to farm.
              </span>
            </div>

            <h1 className="hero-title">
              Fresh{" "}
              <span className="hero-title-highlight">organic groceries</span>{" "}
              at your doorstep.
            </h1>

            {/* <p className="hero-text">
              Experience grocery shopping in a whole new way. Explore vibrant,
              farm-fresh fruits, vegetables and essentials with real-time
              freshness and eco-friendly delivery.
            </p> */}

            <div className="hero-stats-row">
              <div className="hero-stat">
                <div className="hero-stat-value">150+</div>
                <div className="hero-stat-label">Partner farms</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">98%</div>
                <div className="hero-stat-label">Happy customers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">4.5</div>
                <div className="hero-stat-label">Rating</div>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/shop" className="hero-btn-primary">
        Start shopping
        <span className="icon">→</span>
      </Link>

      <Link
        to="/shop"
        className="hero-btn-ghost"
      >
        <span className="hero-btn-ghost-dot" />
        View today&apos;s organic box
      </Link>
            </div>

            <div className="hero-note">
              <span className="hero-note-pill" />
              Delivering in under 30 minutes in select areas. Zero plastic packaging.
            </div>
          </div>

          {/* RIGHT: 3D SCENE */}
          <div className="hero-right">
            <div className="hero-scene-wrapper">
              <div className="hero-scene">
                <div className="hero-card-main">
                  <div className="hero-card-header">
                    <div className="hero-card-title">Organic Veggie Basket</div>
                    <div className="hero-card-pill">Freshly packed · Today</div>
                  </div>
                  <div className="hero-card-subtitle">
                    Curated seasonal veggies for a full week&apos;s meals.
                  </div>

                  <div className="hero-card-body">
                    <div className="hero-card-img-wrap">
                      <div className="hero-card-img-inner">
                        {/* Use your existing hero vegetables image here */}
                        <img
                          src="./images/hero-banner.png"
                          alt="Organic vegetable basket"
                          className="hero-main-img"
                          loading="lazy"
                        />
                      </div>

                      <div className="hero-card-pills-bottom">
                        <span className="hero-mini-pill">Farm direct</span>
                        <span className="hero-mini-pill">No chemicals</span>
                      </div>
                    </div>

                    <div className="hero-card-right">
                      <div className="hero-price-row">
                        <div className="hero-price-main">₹699</div>
                        <div className="hero-price-old">₹899</div>
                        <div className="hero-price-tag">Save 22%</div>
                      </div>

                      <div className="hero-list">
                        <div className="hero-list-item">
                          <span className="hero-list-dot" />
                          12–14 varieties of seasonal veggies.
                        </div>
                        <div className="hero-list-item">
                          <span className="hero-list-dot" />
                          Harvested within the last 24 hours.
                        </div>
                        <div className="hero-list-item">
                          <span className="hero-list-dot" />
                          Compostable packaging, zero plastic.
                        </div>
                      </div>

                      <div className="hero-card-cta">
                        <button className="hero-card-btn">
                          Add to cart
                        </button>
                        {/* <span className="hero-card-stock">
                          <span className="hero-card-stock-dot" />
                          In stock · 32 left today
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating 3D badges */}
                <div className="hero-floating-badge hero-badge-top">
                  <span className="icon">🌿</span>
                  <span>Certified organic farms</span>
                </div>
                <div className="hero-floating-badge hero-badge-left">
                  <span className="icon">🕒</span>
                  <span>Delivered in under 30 min</span>
                </div>
                <div className="hero-floating-badge hero-badge-right">
                  <span className="icon">📦</span>
                  <span>Reusable crates &amp; boxes</span>
                </div>

                {/* Floating fruits */}
                <div className="hero-fruit apple">🍎</div>
                <div className="hero-fruit leaf">🥬</div>
                <div className="hero-fruit carrot">🥕</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
