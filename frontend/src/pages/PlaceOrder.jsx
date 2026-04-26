import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InputField = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-semibold text-gray-600">{label}</label>}
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      )}
      <input
        {...props}
        className={`w-full py-3 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none
          focus:border-[#ff6b6b] focus:bg-white transition-all duration-300 text-gray-800
          placeholder:text-gray-400 ${icon ? "pl-10" : "pl-4"}`}
      />
    </div>
  </div>
);

const steps = ["Cart", "Delivery", "Payment"];

const PlaceOrder = () => {
  const { cartItems, cartTotal, token, data, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const collectData = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);

    const orderItems = data
      .filter((item) => cartItems[item._id])
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        { 
          address: userInfo, 
          items: orderItems, 
          amount: cartTotal() + 2,
          paymentMethod 
        },
        { headers: { token, "ngrok-skip-browser-warning": "true" } }
      );

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg || "Something went wrong");
      console.log(error.message);
    } finally {
      setPlacing(false);
    }
  };

  const total = cartTotal();
  const deliveryFee = total > 0 ? 2 : 0;
  const cartItemsArray = data.filter((item) => cartItems[item._id] > 0);

  useEffect(() => {
    if (!token || cartTotal() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i === 1
                    ? "bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg shadow-red-200"
                    : i < 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}>
                  {i < 1 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className={`text-xs font-semibold ${i === 1 ? "text-[#ff6b6b]" : i < 1 ? "text-green-500" : "text-gray-400"}`}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-20 sm:w-32 h-0.5 mx-2 mb-5 rounded-full ${i < 1 ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={placeOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Left: Delivery Form ── */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Delivery Information</h2>
                    <p className="text-sm text-gray-500">Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      name="firstName" required
                      value={userInfo.firstName}
                      onChange={collectData}
                      placeholder="John"
                      icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                    />
                    <InputField
                      label="Last Name"
                      name="lastName" required
                      value={userInfo.lastName}
                      onChange={collectData}
                      placeholder="Doe"
                    />
                  </div>

                  <InputField
                    label="Email Address"
                    name="email" type="email" required
                    value={userInfo.email}
                    onChange={collectData}
                    placeholder="john@example.com"
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  />

                  <InputField
                    label="Street Address"
                    name="street" required
                    value={userInfo.street}
                    onChange={collectData}
                    placeholder="123 Main Street"
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" name="city" required value={userInfo.city} onChange={collectData} placeholder="New York" />
                    <InputField label="State" name="state" required value={userInfo.state} onChange={collectData} placeholder="NY" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="ZIP Code" name="zipCode" required value={userInfo.zipCode} onChange={collectData} placeholder="10001" />
                    <InputField label="Country" name="country" required value={userInfo.country} onChange={collectData} placeholder="USA" />
                  </div>

                  <InputField
                    label="Phone Number"
                    name="phone" required
                    value={userInfo.phone}
                    onChange={collectData}
                    placeholder="+1 (555) 000-0000"
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  />
                </div>
              </div>

              {/* Delivery options */}
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Delivery Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Standard Delivery", time: "30–45 min", price: "$2.00", selected: true },
                    { label: "Express Delivery", time: "15–20 min", price: "$5.00", selected: false },
                  ].map((opt) => (
                    <div key={opt.label} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      opt.selected ? "border-[#ff6b6b] bg-red-50" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        opt.selected ? "border-[#ff6b6b]" : "border-gray-300"
                      }`}>
                        {opt.selected && <div className="w-2 h-2 rounded-full bg-[#ff6b6b]" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.time}</p>
                      </div>
                      <span className={`font-bold text-sm ${opt.selected ? "text-[#ff6b6b]" : "text-gray-600"}`}>{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h2>

                {/* Items list */}
                <div className="space-y-3 mb-6 max-h-52 overflow-y-auto pr-1">
                  {cartItemsArray.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff6b6b] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {cartItems[item._id]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <span className="font-bold text-gray-800 text-sm shrink-0">
                        ${(item.price * cartItems[item._id]).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-100 mb-5" />

                {/* Price breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({cartItemsArray.length} items)</span>
                    <span className="font-semibold text-gray-700">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Delivery Fee
                    </span>
                    <span className="font-semibold text-gray-700">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Free packaging
                    </span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#ff6b6b]/10 to-[#ee5a6f]/10 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-black text-[#ff6b6b]">${(total + deliveryFee).toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment method */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-gray-700 mb-3">Payment Method</p>
                  <div className="space-y-2">
                    {[
                      { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: "💵" },
                      { id: "stripe", label: "Pay Online (Stripe)", sub: "Credit / Debit card", icon: "💳" },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          paymentMethod === m.id
                            ? "border-[#ff6b6b] bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)}
                          className="accent-[#ff6b6b]"
                        />
                        <span className="text-xl">{m.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{m.label}</p>
                          <p className="text-xs text-gray-400">{m.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { icon: "🔒", label: "Secure" },
                    { icon: "⚡", label: "Fast" },
                    { icon: "↩️", label: "Refundable" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl p-2">
                      <span className="text-lg">{b.icon}</span>
                      <span className="text-xs font-semibold text-gray-600">{b.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={placing}
                  className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  {placing ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Proceed to Payment
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Payments are encrypted and secure
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
