import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Singup } from "../Pages/Singup";
import { Protected } from "../Component/Protected";
import { AddProduct } from "../Pages/AddProduct";
import { OrderSuccess } from "../Pages/OrderSuccess";


export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    !!sessionStorage.getItem("token") // ensure boolean
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Cart → only requires login */}
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />

        {/* ✅ AddProduct → requires login + role === 'SELLER' */}
        <Route
          path="/addProduct"
          element={
            <Protected isSignedIn={isSignedIn} allowedRoles={["SELLER"]}>
              <AddProduct />
            </Protected>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        

        {/* Checkout → only requires login */}
        <Route
          path="/checkout"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CheckOut />
            </Protected>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </>
  );
};
