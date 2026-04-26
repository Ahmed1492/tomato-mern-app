import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { OrderSkeleton, StatsSkeleton, TimelineSkeleton } from "../components/OrderSkeleton";
import Footer from "../components/Footer";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const ordersPerPage = 5;

  const getUserOrders = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${url}/api/order/user-orders`, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
      setUserOrders(response.data.orders || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getUserOrders();
  }, [token]);

  // Calculate statistics
  const getOrderStats = () => {
    const totalSpent = userOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const processingOrders = userOrders.filter(order => order.status?.toLowerCase().includes('processing')).length;
    const deliveredOrders = userOrders.filter(order => order.status?.toLowerCase() === 'delivered').length;
    const cancelledOrders = userOrders.filter(order => order.status?.toLowerCase() === 'cancelled').length;
    
    return { totalSpent, processingOrders, deliveredOrders, cancelledOrders };
  };

  // Filter orders
  const getFilteredOrders = () => {
    if (activeFilter === "All") return userOrders;
    return userOrders.filter(order => {
      const status = order.status?.toLowerCase() || '';
      switch (activeFilter) {
        case "Food Processing": return status.includes('processing');
        case "Out for Delivery": return status.includes('delivery');
        case "Delivered": return status === 'delivered';
        case "Cancelled": return status === 'cancelled';
        default: return true;
      }
    });
  };

  // Pagination
  const filteredOrders = getFilteredOrders();
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const stats = getOrderStats();
  const filters = ["All", "Food Processing", "Out for Delivery", "Delivered", "Cancelled"];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-800">My Orders</h1>
              <p className="text-gray-500">Track your order history and current deliveries</p>
            </div>
          </div>

          {/* Statistics Cards */}
          {loading ? (
            <StatsSkeleton />
          ) : userOrders.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 text-white">
                <div className="text-2xl font-bold">${stats.totalSpent}</div>
                <div className="text-red-100 text-sm">Total Spent</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 text-white">
                <div className="text-2xl font-bold">{stats.processingOrders}</div>
                <div className="text-purple-100 text-sm">Processing</div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white">
                <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
                <div className="text-green-100 text-sm">Delivered</div>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white">
                <div className="text-2xl font-bold">{stats.cancelledOrders}</div>
                <div className="text-orange-100 text-sm">Cancelled</div>
              </div>
            </div>
          ) : null}

          {/* Order Timeline */}
          {loading ? (
            <TimelineSkeleton />
          ) : userOrders.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👨‍🍳</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {userOrders[0]?.items?.[0]?.name || 'Butterscotch Cake'}
                </span>
              </div>
              
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#ff6b6b] rounded-full"></div>
                  <span className="text-[#ff6b6b] font-semibold">Food Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-400">Out for Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-400">Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-400">Cancelled</span>
                </div>
              </div>
            </div>
          ) : null}

          {/* Filter Tabs */}
          {!loading && userOrders.length > 0 && (
            <div className="flex items-center gap-4 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#ff6b6b] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
              <button
                onClick={() => {
                  getUserOrders();
                  toast.info("Orders refreshed!");
                }}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <OrderSkeleton key={i} />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {activeFilter === "All" ? "No Orders Yet" : `No ${activeFilter} Orders`}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeFilter === "All" 
                ? "You haven't placed any orders yet. Start shopping and your orders will appear here!"
                : `You don't have any ${activeFilter.toLowerCase()} orders.`
              }
            </p>
            {activeFilter === "All" && (
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Orders List */}
            <div className="space-y-4">
              {currentOrders.map((order, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ff6b6b] rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">Order #{order._id?.slice(-8).toUpperCase()}</h3>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()} • {new Date(order.date).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {order.status || 'Processing'}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#ff6b6b]">${order.amount}.00</div>
                          <div className="text-sm text-green-600 font-semibold">Paid</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Summary */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {order.items?.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                            <img 
                              src={item.image || `/food_${(idx % 32) + 1}.png`} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `/food_${(idx % 32) + 1}.png`;
                              }}
                            />
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-bold">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {order.items?.map(item => `${item.name} x${item.quantity}`).join(', ')}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300"
                      >
                        <svg className={`w-4 h-4 transition-transform ${expandedOrder === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {expandedOrder === index ? 'Hide' : 'Details'}
                      </button>
                      <button
                        onClick={() => toast.success("Reorder functionality coming soon!")}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ff6b6b] hover:bg-[#ee5a6f] text-white text-sm font-medium rounded-lg transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reorder
                      </button>
                      <button
                        onClick={() => toast.success("Order tracking details sent!")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Track Order
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === index && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Delivery Address */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            Delivery Address
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-semibold">{order.address?.firstName} {order.address?.lastName}</p>
                            <p>{order.address?.street}</p>
                            <p>{order.address?.city}, {order.address?.state} {order.address?.zipCode}</p>
                            <p>{order.address?.country}</p>
                            <p className="flex items-center gap-1 text-[#ff6b6b]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {order.address?.phone}
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items?.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                                    <img 
                                      src={item.image || `/food_${(itemIdx % 32) + 1}.png`} 
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = `/food_${(itemIdx % 32) + 1}.png`;
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">×{item.quantity}</p>
                                  </div>
                                </div>
                                <span className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="border-t border-gray-200 pt-3 mt-3">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800">Total</span>
                                <span className="font-bold text-[#ff6b6b] text-lg">${order.amount}.00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div className="mt-8">
                        <h4 className="font-bold text-gray-800 mb-4">Order Timeline</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-xs text-green-600 font-semibold">Order Placed</span>
                          </div>
                          <div className="flex-1 h-0.5 bg-green-400 mx-2"></div>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-xs text-green-600 font-semibold">Processing</span>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <span className="text-xs text-gray-400">Out for Delivery</span>
                          </div>
                          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                              <span className="text-white text-xs font-bold">4</span>
                            </div>
                            <span className="text-xs text-gray-400">Delivered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-1">
                  {/* Previous button */}
                  <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                          currentPage === pageNum
                            ? 'bg-[#ff6b6b] text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Show dots if there are more pages */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2 text-gray-400">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-10 h-10 rounded-full bg-white text-gray-600 hover:bg-gray-100 font-semibold transition-all duration-300"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next button */}
                  <button
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;