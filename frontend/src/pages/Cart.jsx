import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, data, token, addToCart } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const total = cartTotal();
  const deliveryFee = total > 0 ? 2 : 0;
  const finalTotal = total + deliveryFee - discount;

  const handlePlaceOrder = () => {
    if (!token) return toast.info("Please login first to place an order");
    if (total === 0) return toast.error("Your cart is empty");
    navigate("/order");
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1);
      toast.success("Promo code applied! 10% discount");
    } else if (promoCode.toLowerCase() === "free5") {
      setDiscount(5);
      toast.success("Promo code applied! $5 off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const cartItemsArray = data.filter(item => cartItems[item._id] > 0);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-24">
        <div className="text-center p-8 bg-white rounded-3xl shadow-2xl max-w-md w-full">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-8">Please login to view your cart and place orders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl mt-[4rem]">
        {/* Header */}
        <div className="text-center mb-12 fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shopping <span className="gradient-text">Cart</span>
          </h1>
          <p className="text-xl text-gray-600">Review your items and proceed to checkout</p>
        </div>

        {cartItemsArray.length === 0 ? (
          <div className="text-center py-20 fadeInUp">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet</p>
            <button
              onClick={() => navigate("/")}
              className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="md:grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8 fadeInUp">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Cart Items ({cartItemsArray.length})
                </h2>

                <div className="space-y-6">
                  {cartItemsArray.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold gradient-text">${item.price}</span>
                          <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 bg-white rounded-full p-2 shadow-md">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-bold text-gray-800">
                            {cartItems[item._id]}
                          </span>
                          <button
                            onClick={() => addToCart(item._id)}
                            className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-800">
                            ${(item.price * cartItems[item._id]).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">Total</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-8 fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Promo Code</label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Try: SAVE10 or FREE5
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center py-2 text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center py-2 text-lg">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold gradient-text text-xl">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary text-white font-bold py-4 rounded-xl w-full text-lg mb-4"
                >
                  Proceed to Checkout
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
