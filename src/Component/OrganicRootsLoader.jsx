// src/Component/Common/OrganicRootsLoader.jsx
import React from "react";

export const OrganicRootsLoader = ({ message = "Please wait...", fullScreen = true }) => {
  const wrapperStyle = fullScreen
    ? {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }
    : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };

  return (
    <div style={wrapperStyle}>
      <div
        style={{
          background: "linear-gradient(145deg, #3fa96a, #6bc389, #a2e59c)",
          borderRadius: 20,
          padding: "22px 28px",
          boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 260,
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 20%, #ffffff, #7edea2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* rotating ring */}
          <div
            style={{
              position: "absolute",
              width: 82,
              height: 82,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.4)",
              borderTopColor: "rgba(255,255,255,0.9)",
              animation: "OrganicRoots-spin 1s linear infinite",
            }}
          />
          <i className="fa fa-leaf" style={{ color: "#2f6f46", fontSize: 28 }} />
        </div>

        <h4
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          OrganicRoots
        </h4>
        <p
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: 13,
            marginBottom: 0,
            textAlign: "center",
          }}
        >
          {message}
        </p>
      </div>

      {/* inline keyframes – move to CSS if you prefer */}
      <style>{`
        @keyframes OrganicRoots-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
