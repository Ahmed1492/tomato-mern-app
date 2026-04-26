import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const STATUS_CONFIG = {
  "food processing": { color:"bg-amber-100 text-amber-800 border-amber-200", dot:"bg-amber-400", label:"Processing", icon:"⏳" },
  "out for delivery": { color:"bg-blue-100 text-blue-800 border-blue-200", dot:"bg-blue-400", label:"Out for Delivery", icon:"🚴" },
  "delivered": { color:"bg-green-100 text-green-800 border-green-200", dot:"bg-green-500", label:"Delivered", icon:"✅" },
  "cancelled": { color:"bg-red-100 text-red-800 border-red-200", dot:"bg-red-400", label:"Cancelled", icon:"❌" },
};
const getStatus = (s="") => STATUS_CONFIG[s.toLowerCase()] || { color:"bg-gray-100 text-gray-700 border-gray-200", dot:"bg-gray-400", label:s, icon:"📦" };
const FILTERS = ["All","Food Processing","Out for Delivery","Delivered","Cancelled"];
const fmt = (d) => new Date(d).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});

const StatCard = ({ icon, label, value, sub, gradient }) => (
  <div className={`rounded-2xl p-5 bg-gradient-to-br ${gradient} text-white`}>
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">{label}</p>
    <p className="text-2xl font-black mt-0.5">{value}</p>
    {sub && <p className="text-white/60 text-xs mt-1">{sub}</p>}
  </div>
);

function OrderCard({ order, onReorder }) {
  const [open, setOpen] = useState(false);
  const cfg = getStatus(order.status);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center text-xl shrink-0 shadow-md">{cfg.icon}</div>
          <div className="min-w-0">
            <p className="font-bold text-gray-800 truncate">Order #{order._id.slice(-8).toUpperCase()}</p>
            <p className="text-xs text-gray-400">{fmt(order.createdAt)} · {fmtTime(order.createdAt)}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shrink-0 ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
        </span>
        <div className="text-right shrink-0">
          <p className="text-xl font-black gradient-text">${order.amount.toFixed(2)}</p>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.payment ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{order.payment ? "Paid" : "Unpaid"}</span>
        </div>
      </div>
      <div className="px-5 pb-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {order.items.slice(0,4).map((item,i) => (<img key={i} src={item.image} alt={item.name} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"/>))}
          {order.items.length > 4 && <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">+{order.items.length-4}</div>}
        </div>
        <p className="text-sm text-gray-500 truncate flex-1">{order.items.map(i=>`${i.name} ×${i.quantity}`).join(", ")}</p>
      </div>
      <div className="px-5 pb-5 flex gap-2 flex-wrap">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all duration-300">
          <svg className={`w-4 h-4 transition-transform duration-300 ${open?"rotate-180":""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
          {open ? "Hide" : "Details"}
        </button>
        <button onClick={() => onReorder(order.items)} className="flex items-center gap-1.5 px-4 py-2 btn-primary text-white font-semibold rounded-xl text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Reorder
        </button>
      </div>
      {open && (
        <div className="border-t border-gray-100 bg-gray-50 p-5 fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-sm flex items-center gap-2">📍 Delivery Address</h4>
              <div className="bg-white rounded-xl p-4 text-sm text-gray-600 space-y-1 border border-gray-100">
                <p className="font-semibold text-gray-800">{order.address?.firstName} {order.address?.lastName}</p>
                <p>{order.address?.street}</p>
                <p>{order.address?.city}, {order.address?.state} {order.address?.zipCode}</p>
                <p>{order.address?.country}</p>
                {order.address?.phone && <p className="text-gray-500">📞 {order.address.phone}</p>}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-sm">📋 Order Items</h4>
              <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2">
                {order.items.map((item,i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover shrink-0"/>
                    <span className="flex-1 text-sm text-gray-700 truncate">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                    <span className="text-sm font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-bold">
                  <span className="text-gray-600">Total</span>
                  <span className="gradient-text">${order.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderHistoryPanel({ compact = false }) {
  const { url, token, data, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("All");
  const LIMIT = compact ? 3 : 5;

  const fetchOrders = async (p=1, f=filter) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/order/history?page=${p}&limit=${LIMIT}&status=${f==="All"?"":f}`, { headers: { token } });
      if (res.data.success) {
        setOrders(res.data.orders);
        setStats(res.data.stats);
        setTotalPages(res.data.pagination.totalPages);
        setPage(p);
      }
    } catch { toast.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (token) fetchOrders(1, filter); }, [token, filter]);

  const handleReorder = (items) => {
    items.forEach(item => {
      const foodItem = data.find(f => f._id === item._id || f.name === item.name);
      if (foodItem) for (let i = 0; i < (item.quantity||1); i++) addToCart(foodItem._id);
    });
    toast.success("Items added to cart! 🛒");
    navigate("/cart");
  };

  if (!token) return null;

  return (
    <div className="space-y-6">
      {stats && !compact && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fadeInUp">
          <StatCard icon="📦" label="Total Orders" value={stats.totalOrders} gradient="from-[#ff6b6b] to-[#ee5a6f]" />
          <StatCard icon="💰" label="Total Spent" value={`$${stats.totalSpent}`} sub="all time" gradient="from-violet-500 to-purple-600" />
          <StatCard icon="✅" label="Delivered" value={stats.delivered} gradient="from-green-400 to-emerald-600" />
          <StatCard icon="⏳" label="In Progress" value={stats.pending} gradient="from-amber-400 to-orange-500" />
        </div>
      )}
      {stats?.favoriteItem && !compact && (
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-2xl px-5 py-4 flex items-center gap-3 fadeInUp">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Your Most Ordered</p>
            <p className="font-bold text-gray-800">{stats.favoriteItem}</p>
          </div>
        </div>
      )}
      {!compact && (
        <div className="flex gap-2 flex-wrap fadeInUp">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter===f ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-[#ff6b6b] hover:text-[#ff6b6b]"}`}>{f}</button>
          ))}
          <button onClick={() => fetchOrders(page, filter)} className="ml-auto px-4 py-2 rounded-full text-sm font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh
          </button>
        </div>
      )}
      {loading ? (
        <div className="space-y-4">{Array.from({length:compact?2:3}).map((_,i) => (<div key={i} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse"><div className="flex gap-4"><div className="skeleton w-12 h-12 rounded-xl shrink-0"/><div className="flex-1 space-y-3"><div className="skeleton h-5 w-44"/><div className="skeleton h-4 w-28"/></div></div></div>))}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-6">{filter!=="All" ? `No ${filter} orders` : "You haven't placed any orders yet"}</p>
          <button onClick={() => navigate("/")} className="btn-primary text-white font-semibold px-8 py-3 rounded-full">Start Shopping</button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order,i) => (<div key={order._id} className="fadeInUp" style={{animationDelay:`${i*0.07}s`}}><OrderCard order={order} onReorder={handleReorder}/></div>))}
        </div>
      )}
      {!compact && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2 fadeInUp">
          <button onClick={() => fetchOrders(page-1)} disabled={page===1} className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
            <button key={p} onClick={() => fetchOrders(p)} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${p===page ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg scale-105" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{p}</button>
          ))}
          <button onClick={() => fetchOrders(page+1)} disabled={page===totalPages} className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      )}
      {compact && orders.length > 0 && (
        <button onClick={() => navigate("/my-orders")} className="w-full py-3 border-2 border-dashed border-gray-200 hover:border-[#ff6b6b] text-gray-500 hover:text-[#ff6b6b] rounded-2xl font-semibold text-sm transition-all duration-300">View All Orders →</button>
      )}
    </div>
  );
}
