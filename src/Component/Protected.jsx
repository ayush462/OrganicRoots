// Component/Protected.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export const Protected = ({ isSignedIn, allowedRoles, children }) => {
  const role = sessionStorage.getItem("role"); // "SELLER" / "BUYER" / null

  // Not logged in → go to login
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // If route requires specific roles and current role is not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but not allowed (e.g. BUYER trying /addProduct)
    return <Navigate to="/" replace />;
  }

  // Everything OK → render the page
  return children;
};
