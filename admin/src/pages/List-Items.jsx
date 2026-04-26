import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CATEGORY_COLORS = {
  Salad:"bg-green-100 text-green-700", Rolls:"bg-yellow-100 text-yellow-700",
  Deserts:"bg-pink-100 text-pink-700", Sandwich:"bg-orange-100 text-orange-700",
  Cake:"bg-purple-100 text-purple-700", "Pure-Veg":"bg-emerald-100 text-emerald-700",
  Pasta:"bg-blue-100 text-blue-700", Noodles:"bg-red-100 text-red-700",
  Burger:"bg-amber-100 text-amber-700",
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 border-b border-gray-100">
    <div className="skeleton w-16 h-16 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2"><div className="skeleton h-4 w-40"/><div className="skeleton h-3 w-24"/></div>
    <div className="skeleton h-6 w-20 rounded-full"/>
    <div className="skeleton h-6 w-16"/>
    <div className="skeleton h-8 w-20 rounded-xl"/>
  </div>
);

const ListItems = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/food/get`);
      setData(res.data.food || []);
    } catch { toast.error("Failed to load items"); }
    finally { setLoading(false); }
  };

  const removeItem = async (id) => {
    setDeleting(id);
    try {
      const res = await axios.delete(`${url}/api/food/remove`, { data: { id } });
      if (res.data.success) { toast.success("Item removed"); await fetchItems(); }
      else toast.error(res.data.message);
    } catch { toast.error("Failed to remove item"); }
    finally { setDeleting(null); }
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = data.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fadeInUp">
          <div>
            <h1 className="text-3xl font-black text-gray-800 mb-1">Food List</h1>
            <p className="text-gray-500">{data.length} items in menu</p>
          </div>
          <div className="relative">
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search items..."
              className="pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] transition-all duration-300 text-sm w-64"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 fadeInUp">
          {[
            { label: "Total Items", value: data.length, icon: "🍽️", color: "from-[#ff6b6b] to-[#ee5a6f]" },
            { label: "Categories", value: [...new Set(data.map(i => i.category))].length, icon: "📂", color: "from-violet-500 to-purple-600" },
            { label: "Avg Price", value: data.length ? `$${(data.reduce((s,i)=>s+i.price,0)/data.length).toFixed(2)}` : "$0", icon: "💰", color: "from-green-400 to-emerald-600" },
            { label: "Showing", value: filtered.length, icon: "🔍", color: "from-blue-400 to-indigo-600" },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-white`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-white/70 text-xs font-semibold">{s.label}</p>
              <p className="text-xl font-black">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card overflow-hidden fadeInUp">
          {/* Table header */}
          <div className="grid grid-cols-[4rem_1fr_auto_auto_auto] gap-4 items-center px-6 py-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
            <span>Image</span><span>Name</span><span>Category</span><span>Price</span><span>Action</span>
          </div>

          {loading ? (
            Array.from({length:5}).map((_,i) => <SkeletonRow key={i}/>)
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍽️</div>
              <p className="text-gray-500 font-medium">{search ? "No items match your search" : "No food items yet"}</p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={item._id}
                className="grid grid-cols-[4rem_1fr_auto_auto_auto] gap-4 items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-all duration-200 fadeInUp"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-600"}`}>
                  {item.category}
                </span>
                <span className="font-black text-gray-800">${item.price}</span>
                <button
                  onClick={() => removeItem(item._id)}
                  disabled={deleting === item._id}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl text-sm transition-all duration-300 disabled:opacity-50"
                >
                  {deleting === item._id ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  )}
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItems;
