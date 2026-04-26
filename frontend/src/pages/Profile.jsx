import { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import Avatar from "../components/Avatar";
import OrderHistoryPanel from "../components/OrderHistoryPanel";
import ProductPopup from "../components/ProductPopup";

export default function Profile() {
  const { userData, token, url, fetchUserData, data, favorites, removeFromFavorites, addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedItem, setSelectedItem] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const favoriteItems = data.filter((item) => favorites.includes(item._id));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const updateUserImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", image);
      const res = await axios.post(`${url}/api/auth/add-image`, fd, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchUserData();
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch { toast.error("Failed to update image"); }
    finally { setLoading(false); }
  };

  const removeUserImage = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${url}/api/auth/remove-image`, {
        headers: { token },
      });
      if (res.data.success) { toast.success(res.data.message); await fetchUserData(); }
    } catch { toast.error("Failed to remove image"); }
    finally { setLoading(false); }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
        <div className="text-center p-8 fadeInUp">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-8">You need to sign in to access your profile</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "info", label: "Profile Info", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: "orders", label: "Order History", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
    { id: "favorites", label: `Favorites${favoriteItems.length ? ` (${favoriteItems.length})` : ""}`, icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { id: "actions", label: "Quick Actions", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
  ];

  return (
    <>
      {selectedItem && <ProductPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Hero banner */}
          <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] p-8 fadeInUp">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar
                  src={image ? URL.createObjectURL(image) : userData?.image}
                  name={userData?.name}
                  size="xl"
                  className="ring-4 ring-white/50 shadow-2xl"
                />
                <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <svg className="w-4 h-4 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>

              <div className="text-white text-center sm:text-left">
                <h1 className="text-3xl font-black mb-1">{userData?.name || "Welcome!"}</h1>
                <p className="text-white/80 mb-3">{userData?.email}</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {favoriteItems.length} Favorites
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Joined {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recently"}
                  </span>
                </div>
              </div>

              {/* Image save/cancel */}
              {image && (
                <div className="sm:ml-auto flex gap-2">
                  <button onClick={updateUserImage} disabled={loading} className="bg-white text-[#ff6b6b] font-bold px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition-all duration-300 disabled:opacity-60">
                    {loading ? "Saving..." : "Save Photo"}
                  </button>
                  <button onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="bg-white/20 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/30 transition-all duration-300">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg mb-8 fadeInUp">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab: Profile Info */}
          {activeTab === "info" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 fadeInUp">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] transition-all duration-300"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">{userData?.name || "—"}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    {userData?.email || "—"}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2">Member Since</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Recently joined"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2">Profile Photo</label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <span className="block w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#ff6b6b] rounded-xl text-center text-sm text-gray-500 hover:text-[#ff6b6b] transition-all duration-300">
                        {userData?.image ? "Change Photo" : "Upload Photo"}
                      </span>
                    </label>
                    {userData?.image && (
                      <button onClick={removeUserImage} disabled={loading} className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50">
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                  <button className="btn-primary text-white font-semibold px-8 py-3 rounded-full">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-full transition-all duration-300">Cancel</button>
                </div>
              )}
            </div>
          )}

          {/* Tab: Favorites */}
          {activeTab === "favorites" && (
            <div className="fadeInUp">
              {favoriteItems.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No favorites yet</h3>
                  <p className="text-gray-500 mb-8">Tap the ❤️ on any dish to save it here for quick access</p>
                  <button onClick={() => window.location.href = "/"} className="btn-primary text-white font-semibold px-8 py-3 rounded-full">
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Your Favorites <span className="gradient-text">({favoriteItems.length})</span>
                    </h2>
                    <p className="text-sm text-gray-500">Click a card to view details</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteItems.map((item, i) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group fadeInUp"
                        style={{ animationDelay: `${i * 0.07}s` }}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="relative">
                          <img src={item.image} alt={item.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">{item.category}</span>
                          </div>
                          {/* Remove from favorites */}
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFromFavorites(item._id); toast.success("Removed from favorites"); }}
                            className="absolute top-3 right-3 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{item.name}</h3>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-black gradient-text">${item.price}</span>
                            {cartItems[item._id] ? (
                              <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                                <button onClick={(e) => { e.stopPropagation(); removeFromCart(item._id); }} className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">−</button>
                                <span className="px-2 font-bold text-sm">{cartItems[item._id]}</span>
                                <button onClick={(e) => { e.stopPropagation(); addToCart(item._id); }} className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">+</button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); addToCart(item._id); toast.success("Added to cart!"); }}
                                className="btn-primary text-white font-semibold px-5 py-2 rounded-full text-sm flex items-center gap-1.5"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab: Order History */}
          {activeTab === "orders" && (
            <div className="fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
                <button
                  onClick={() => window.location.href = "/my-orders"}
                  className="text-sm text-[#ff6b6b] font-semibold hover:underline flex items-center gap-1"
                >
                  View Full Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <OrderHistoryPanel compact={true} />
            </div>
          )}

          {/* Tab: Quick Actions */}
          {activeTab === "actions" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fadeInUp">
              {[
                {
                  title: "My Orders", desc: "View order history and track deliveries", href: "/my-orders",
                  color: "from-blue-400 to-blue-600", label: "View Orders",
                  icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                },
                {
                  title: "Shopping Cart", desc: "Review items in your cart before checkout", href: "/cart",
                  color: "from-purple-400 to-purple-600", label: "View Cart",
                  icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                },
                {
                  title: "Browse Menu", desc: "Discover new dishes and add to favorites", href: "/search",
                  color: "from-orange-400 to-red-500", label: "Explore",
                  icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                },
              ].map((action, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-500 text-sm mb-5">{action.desc}</p>
                  <button
                    onClick={() => window.location.href = action.href}
                    className="text-[#ff6b6b] font-semibold hover:text-[#ee5a6f] transition-colors duration-300 flex items-center gap-1 text-sm"
                  >
                    {action.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
