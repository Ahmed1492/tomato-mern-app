import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import LoginPop from "./components/LoginPop";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <div className="">
      <ToastContainer />
      <ScrollToTop />
      <Navbar setIsLogin={setIsLogin} />
      {isLogin && <LoginPop setIsLogin={setIsLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <div className=" text-3xl py-3  min-h-[41vh] px-[7%]  ">
              <h2 className="mt-[3rem] ">404 Not Found Page</h2>
            </div>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
