"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function PaymentFailed() {
  useEffect(() => {
    startConfetti();
  }, []);

  const startConfetti = () => {
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#f95959", "#ff0000"],
      });
    }, 500);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col text-center">
      <Card className="p-6 border-red-500 shadow-lg">
        <CloseCircleOutlined className="text-6xl text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>
        <p className="text-lg text-gray-600 mt-2">
          Oops! Something went wrong. Please try again.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link to="/checkout">
            <Button type="primary" danger>
              Retry Payment
            </Button>
          </Link>
          <Link to="/">
            <Button type="default">Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
