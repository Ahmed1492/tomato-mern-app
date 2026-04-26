import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddItems from "./pages/Add-Items";
import ListItems from "./pages/List-Items";
import Orders from "./pages/Orders";

const URL = "http://localhost:4000";

const App = () => (
  <div className="min-h-screen bg-gray-50">
    <ToastContainer position="top-right" autoClose={2500} />
    <Navbar />
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/"       element={<AddItems  url={URL} />} />
        <Route path="/list"   element={<ListItems url={URL} />} />
        <Route path="/orders" element={<Orders    url={URL} />} />
      </Routes>
    </div>
  </div>
);

export default App;
