import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from "axios";

const Verify = () => {
  const { url, setCartItems } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | failed

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        let myResponse = await axios.post(
          `${url}/api/order/verify`,
          { orderId, success },
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        if (myResponse.data.success) {
          setCartItems({});
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.log(error);
        setStatus("failed");
      }
    };
    if (orderId) verifyPayment();
  }, [orderId, success]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white gap-6">
        <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[#ff6b6b] animate-spin" />
        <p className="text-gray-500 font-medium text-lg">Confirming your order…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

          {/* Animated checkmark */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-200">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-black text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Your order has been placed successfully.</p>
          {orderId && (
            <p className="text-sm text-gray-400 mb-8">
              Order ID: <span className="font-mono font-bold text-gray-600">#{orderId.slice(-10).toUpperCase()}</span>
            </p>
          )}

          {/* Steps */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3">
            {[
              { icon: "✅", text: "Order received by restaurant" },
              { icon: "👨‍🍳", text: "Food is being prepared" },
              { icon: "🚴", text: "Delivery on the way soon" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg">{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/my-orders"
              className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Track Order
            </Link>
            <Link
              to="/"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Failed
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

        <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-red-200">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-gray-800 mb-2">Order Failed</h1>
        <p className="text-gray-500 mb-8">Something went wrong with your order. Your cart has not been cleared.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Back to Cart
          </button>
          <Link
            to="/"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
