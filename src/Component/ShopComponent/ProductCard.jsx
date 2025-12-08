import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const ProductCard = (props) => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));



  const handalClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handalCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch("http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/cart/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: props.id,
        quantity: 1,
      }),
    });

    if (res.status === 200) {
      toast.success("Product added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
      // const data = await res.json(); // if you want to use it later
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <li className="product-grid-item">
        <div className="organic-card">
          <figure className="organic-img-box">
            <img
              src={`data:image/png;base64,${props.img}`}
              alt={props.name}
              className="organic-img"
            />

            {/* badges */}
            <div className="organic-badge">
              <ion-icon name="leaf-outline" />
              <span>OrganicRoots</span>
            </div>

            <div className="organic-discount">-{20}%</div>

            {/* quick actions */}
            <div className="organic-actions">
              <button className="icon-btn" aria-label="Add to wishlist">
                <ion-icon name="heart-outline" />
              </button>

              <button
                className="icon-btn"
                onClick={() => handalClick(props.id)}
                aria-label="View product"
              >
                <ion-icon name="eye-outline" />
              </button>
            </div>
          </figure>

          {/* content */}
          <div className="organic-body">
            <h3 className="organic-title">
              <a href={`/product/${props.id}`}>{props.name}</a>
            </h3>

            <div className="organic-rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <ion-icon key={n} name="star" />
              ))}
            </div>

            <div className="organic-price">
              <del>Rs {props.price + 80}</del>
              <span>Rs {props.price}</span>
            </div>
          </div>

          <button className="organic-add-btn" onClick={handalCart}>
            <ion-icon name="cart-outline" />
            <span>Add to Cart</span>
          </button>
        </div>
      </li>

      {/* remove this if you already have <ToastContainer /> in App.jsx */}


      <style>{`
        .product-grid-item {
          list-style: none;
          height: 100%;
        }

        .organic-card {
          box-sizing: border-box;
          height: 100%;
          min-height: 360px;
          max-height: 360px;
          background: radial-gradient(circle at top, #f3fff7, #ffffff);
          border-radius: 18px;
          padding: 12px 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 8px;
          border: 1px solid rgba(63, 169, 106, 0.18);
          box-shadow: 0 10px 26px rgba(38, 98, 66, 0.16);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          position: relative;
        }

        .organic-card::before {
          content: "";
          position: absolute;
          inset: -3%;
          background: radial-gradient(circle at top, rgba(111,195,137,0.22), transparent 60%);
          opacity: 0;
          pointer-events: none;
          border-radius: 20px;
          transition: opacity 0.25s ease;
        }

       .organic-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 34px rgba(38, 98, 66, 0.22);
        border: 2px solid #3fa96a !important;  /* 🌿 Organic green hover border */
        background: radial-gradient(circle at top, #effff4, #ffffff); /* slight organic glow */
}


        .organic-card:hover::before {
          opacity: 1;
        }

        .organic-img-box {
          width: 100%;
          height: 170px; /* fixed height for all cards */
          border-radius: 14px;
          background: linear-gradient(135deg, #a2e59c40, #7ddba740, #e4ffd640);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .organic-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.18));
          animation: float 4s ease-in-out infinite;
        }

        /* greener theme for badges */
        .organic-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #2f6f46;
          box-shadow: 0 4px 10px rgba(0,0,0,0.18);
        }

        .organic-discount {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #4caf50, #8bc34a);
          padding: 4px 10px;
          border-radius: 999px;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(46, 125, 50, 0.55);
        }

        .organic-actions {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .organic-card:hover .organic-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: #ffffffee;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.16);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .icon-btn ion-icon {
          color: #2f6f46;
          font-size: 18px;
        }

        .icon-btn:hover {
          transform: scale(1.1) translateY(-1px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
        }

        .organic-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 6px;
        }

        .organic-title {
          font-size: 15px;
          font-weight: 600;
          color: #23452c;
          margin: 0;
          min-height: 38px; /* keeps rows equal even if title is 1 or 2 lines */
        }

        .organic-title a {
          color: inherit;
          text-decoration: none;
        }

        .organic-title a:hover {
          text-decoration: underline;
        }

        .organic-rating {
          display: flex;
          gap: 2px;
          font-size: 14px;
          color: #f8b400;
        }

        .organic-price {
          display: flex;
          gap: 8px;
          align-items: baseline;
          margin-top: 2px;
        }

        .organic-price del {
          font-size: 12px;
          color: #9b9b9b;
        }

        .organic-price span {
          font-size: 17px;
          font-weight: 700;
          color: #2f6f46;
        }

        .organic-add-btn {
          margin-top: 4px;
          width: 100%;
          border: none;
          border-radius: 999px;
          padding: 8px 0;
          background: linear-gradient(135deg, #6bc389, #3fa96a);
          color: #ffffff;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(63, 169, 106, 0.38);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }

        .organic-add-btn ion-icon {
          font-size: 18px;
        }

        .organic-add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(63, 169, 106, 0.5);
          background: linear-gradient(135deg, #3fa96a, #2f6f46);
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  );
};
