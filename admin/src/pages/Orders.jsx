import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const STATUS_CONFIG = {
  "Food Processing": { color: "bg-amber-100 text-amber-800 border-amber-200", dot: "bg-amber-400", icon: "⏳" },
  "Out for Delivery": { color: "bg-blue-100 text-blue-800 border-blue-200",   dot: "bg-blue-400",  icon: "🚴" },
  "Delivered":        { color: "bg-green-100 text-green-800 border-green-200", dot: "bg-green-500", icon: "✅" },
  "Cancelled":        { color: "bg-red-100 text-red-800 border-red-200",       dot: "bg-red-400",   icon: "❌" },
};
const getStatus = (s) => STATUS_CONFIG[s] || { color: "bg-gray-100 text-gray-700 border-gray-200", dot: "bg-gray-400", icon: "📦" };

const STATUSES = ["Food Processing", "Out for Delivery", "Delivered"];

const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" });

const SkeletonOrder = () => (
  <div className="card p-6 space-y-4">
    <div className="flex gap-4"><div className="skeleton w-12 h-12 rounded-xl"/><div className="flex-1 space-y-2"><div className="skeleton h-4 w-40"/><div className="skeleton h-3 w-28"/></div></div>
    <div className="skeleton h-4 w-full"/><div className="skeleton h-4 w-3/4"/>
  </div>
);

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, processing: 0, delivering: 0, delivered: 0 });
  const [updating, setUpdating] = useState(null);
  const LIMIT = 10;

  const fetchOrders = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/order/orders?page=${p}&limit=${LIMIT}`);
      if (res.data.success) {
        const all = res.data.orders || [];
        setOrders(all);
        setTotalPages(res.data.totalPages || 1);
        setPage(p);
        setStats({
          total: res.data.total || all.length,
          processing: all.filter(o => o.status === "Food Processing").length,
          delivering: all.filter(o => o.status === "Out for Delivery").length,
          delivered:  all.filter(o => o.status === "Delivered").length,
        });
      }
    } catch { toast.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await axios.put(`${url}/api/order/update-status`, { orderId, status });
      toast.success(`Status updated to "${status}"`);
      await fetchOrders(page);
    } catch { toast.error("Failed to update status"); }
    finally { setUpdating(null); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter(o => {
    const matchFilter = filter === "All" || o.status === filter;
    const matchSearch = !search ||
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      `${o.address?.firstName} ${o.address?.lastName}`.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fadeInUp">
          <div>
            <h1 className="text-3xl font-black text-gray-800 mb-1">Orders</h1>
            <p className="text-gray-500">Manage and track all customer orders</p>
          </div>
          <button onClick={() => fetchOrders(page)} className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-[#ff6b6b] text-gray-600 hover:text-[#ff6b6b] font-semibold rounded-xl text-sm transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 fadeInUp">
          {[
            { label:"Total Orders",   value: stats.total,      icon:"📦", color:"from-[#ff6b6b] to-[#ee5a6f]" },
            { label:"Processing",     value: stats.processing, icon:"⏳", color:"from-amber-400 to-orange-500" },
            { label:"Out for Delivery",value:stats.delivering, icon:"🚴", color:"from-blue-400 to-indigo-600" },
            { label:"Delivered",      value: stats.delivered,  icon:"✅", color:"from-green-400 to-emerald-600" },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-black">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 fadeInUp">
          <div className="flex gap-2 flex-wrap">
            {["All", ...STATUSES].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#ff6b6b] hover:text-[#ff6b6b]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by ID or name..."
              className="pl-9 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] transition-all duration-300 text-sm w-full sm:w-64"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="space-y-4">{Array.from({length:4}).map((_,i) => <SkeletonOrder key={i}/>)}</div>
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 font-medium text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => {
              const cfg = getStatus(order.status);
              return (
                <div key={order._id} className="card p-6 hover:shadow-lg transition-all duration-300 fadeInUp" style={{ animationDelay:`${i*0.05}s` }}>
                  <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left: order info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center text-xl shadow-md shrink-0">
                          {cfg.icon}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-gray-400">{order.createdAt ? fmt(order.createdAt) : "—"}</p>
                        </div>
                        <span className={`ml-auto lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${cfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                          {order.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex -space-x-2">
                          {order.items.slice(0,4).map((item,j) => (
                            <img key={j} src={item.image} alt={item.name} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"/>
                          ))}
                          {order.items.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                              +{order.items.length-4}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {order.items.map(i => `${i.name} ×${i.quantity}`).join(", ")}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                        <p className="font-semibold text-gray-800">{order.address?.firstName} {order.address?.lastName}</p>
                        <p>{order.address?.street}, {order.address?.city}, {order.address?.country}</p>
                        {order.address?.phone && <p className="text-gray-400 text-xs mt-0.5">📞 {order.address.phone}</p>}
                      </div>
                    </div>

                    {/* Right: amount + status + actions */}
                    <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-2xl font-black gradient-text">${order.amount?.toFixed(2)}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.payment ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                          {order.payment ? "Paid" : "Unpaid"}
                        </span>
                      </div>

                      <span className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                        {order.status}
                      </span>

                      {/* Status selector */}
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order._id, e.target.value)}
                          disabled={updating === order._id}
                          className="appearance-none pl-4 pr-8 py-2.5 bg-white border-2 border-gray-200 hover:border-[#ff6b6b] rounded-xl text-sm font-semibold text-gray-700 outline-none transition-all duration-300 cursor-pointer disabled:opacity-50"
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {updating === order._id ? (
                          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#ff6b6b]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                        ) : (
                          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 fadeInUp">
            <button onClick={() => fetchOrders(page-1)} disabled={page===1} className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
              <button key={p} onClick={() => fetchOrders(p)} className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${p===page ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={() => fetchOrders(page+1)} disabled={page===totalPages} className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
