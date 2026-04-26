import { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ setIsLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const { cartItems, token, setToken, setCartItems, userData, url, fetchUserData } = useContext(StoreContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active menu based on pathname
  useEffect(() => {
    if (location.pathname === '/') setMenu('home');
    else if (location.pathname === '/search') setMenu('search');
    else if (location.pathname === '/about') setMenu('about');
    else if (location.pathname === '/contact') setMenu('contact');
    else if (location.pathname === '/cart') setMenu('cart');
    else if (location.pathname === '/my-orders') setMenu('orders');
    else if (location.pathname === '/profile') setMenu('profile');
  }, [location.pathname]);

  const logout = () => {
    setToken("");
    setIsOpenMenu(false);
    setImage(false);
    localStorage.removeItem("food_flow_token");
    setCartItems({});
    navigate("/");
    toast.success("Logged out successfully");
  };

  const updateUserImage = async () => {
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      const res = await axios.post(`${url}/api/auth/add-image`, formData, {
        headers: { token },
      });
      toast.success(res.data.message);
      await fetchUserData();
    } catch (e) { 
      toast.error("Failed to update image");
      console.log(e); 
    } finally { 
      setIsOpenMenu(false); 
      setImage(false); 
    }
  };

  const removeUserImage = async () => {
    try {
      const res = await axios.delete(`${url}/api/auth/remove-image`, {
        headers: { token },
      });
      toast.success(res.data.message);
      await fetchUserData();
    } catch (e) { 
      toast.error("Failed to remove image");
      console.log(e); 
    } finally { 
      setIsOpenMenu(false); 
      setImage(false); 
    }
  };

  const cartCount = cartItems ? Object.values(cartItems).filter(v => v > 0).length : 0;

  const navItems = [
    { name: "home", href: "/", label: "Home" },
    { name: "search", href: "/search", label: "Search" },
    { name: "about", href: "/about", label: "About" },
    { name: "orders", href: "/my-orders", label: "My Orders" },
    { name: "contact", href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-white/90 backdrop-blur-sm py-5'
      }`}>
        <div className="flex items-center text-[#49557e] justify-between px-[8%]">
          {/* Logo */}
          <div 
            onClick={() => navigate("/")}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-[120px] sm:w-[150px]"
              src="/logo.png"
              alt="logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-[14px] flex-wrap lg:text-[17px] gap-6 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMenu(item.name)}
                className={`capitalize relative pb-[2px] transition-all duration-300 group font-medium
                  ${menu === item.name
                    ? "text-[#ff6b6b] after:w-full"
                    : "text-gray-700 hover:text-[#ff6b6b] after:w-0 hover:after:w-full"
                  }
                  after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                  after:bg-gradient-to-r after:from-[#ff6b6b] after:to-[#ee5a6f] 
                  after:transition-all after:duration-300`}
              >
                <span className="relative z-10 hover:scale-105 transition-transform duration-200">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-4 items-center shrink-0">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
            >
              <img src="/search_icon.png" alt="search" width={20} height={20} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110">
              <img src="/basket_icon.png" alt="cart" width={24} height={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpenMenu((p) => !p)}
                  className="relative group"
                >
                  <Avatar
                    src={userData?.image}
                    name={userData?.name}
                    size="sm"
                    className="ring-2 ring-transparent group-hover:ring-[#ff6b6b] transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </button>

                {/* Dropdown Menu */}
                {isOpenMenu && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden fadeIn">
                    {/* Profile Section */}
                    <div className="p-6 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={image ? URL.createObjectURL(image) : userData?.image}
                          name={userData?.name}
                          size="lg"
                          className="ring-4 ring-white/30"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{userData?.name || "User"}</h3>
                          <p className="text-white/80 text-sm">{userData?.email}</p>
                        </div>
                      </div>

                      {/* Image Upload Section */}
                      <div className="mt-4 flex gap-2">
                        <label className="flex-1">
                          <input
                            ref={fileInputRef}
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                          <span className="block w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-center text-sm font-medium cursor-pointer transition-all duration-300">
                            {userData?.image ? "Change Photo" : "Add Photo"}
                          </span>
                        </label>
                        {userData?.image && !image && (
                          <button
                            onClick={removeUserImage}
                            className="py-2 px-4 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {image && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={updateUserImage}
                            className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setImage(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="py-2 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-all duration-300">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Profile</p>
                          <p className="text-sm text-gray-500">Manage your account</p>
                        </div>
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center transition-all duration-300">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">My Orders</p>
                          <p className="text-sm text-gray-500">Track your orders</p>
                        </div>
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setIsOpenMenu(false)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center transition-all duration-300">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">Shopping Cart</p>
                          <p className="text-sm text-gray-500">{cartCount} items</p>
                        </div>
                        {cartCount > 0 && (
                          <span className="bg-[#ff6b6b] text-white text-xs font-bold px-2 py-1 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </Link>

                      <hr className="my-2" />

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-all duration-300 group w-full"
                      >
                        <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center transition-all duration-300">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Logout</p>
                          <p className="text-sm text-gray-500">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  if (setIsLogin) {
                    setIsLogin(true);
                  }
                }}
                className="btn-primary text-white font-semibold px-6 py-2 rounded-full text-sm md:text-base hover:scale-105 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 md:hidden fadeIn">
          <div className="p-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setMenu(item.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`block py-3 px-4 rounded-xl mb-2 transition-all duration-300 ${
                  menu === item.name
                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full mb-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Menu
            </button>
            
            {/* Mobile Sign In Button */}
            {!token && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (setIsLogin) {
                    setIsLogin(true);
                  }
                }}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white font-semibold rounded-xl transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Bar Modal */}
      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
