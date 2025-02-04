"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { clearCart } from "../app/fetchers/product/productSlice";
import { Button } from "antd";

export default function PaymentSuccess() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current URL path

  useEffect(() => {
    if (location.pathname === "/success") {
      dispatch(clearCart());
      startConfetti();
    }
  }, [location.pathname, dispatch]);

  const startConfetti = () => {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <div className="h-screen text-center flex justify-center items-center flex-col">
      <h1 className="text-4xl text-green-500">Congratulations!</h1>
      <h1 className="text-2xl font-bold">Your product has been purchased successfully!</h1>
      <Link to='/dashbord'><Button type="primary">My Order</Button></Link>
    </div>
  );
}
