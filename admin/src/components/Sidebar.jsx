import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/", label: "Add Item", id: "add-items",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: "/list", label: "Food List", id: "list-items",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    to: "/orders", label: "Orders", id: "orders",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <aside className="w-64 min-h-[calc(100vh-65px)] bg-white border-r border-gray-100 shadow-sm shrink-0">
      <nav className="p-4 space-y-1 sticky top-[65px]">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 group ${
              isActive(item.to)
                ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg shadow-red-200"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#ff6b6b]"
            }`}
          >
            <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive(item.to) ? "text-white" : "text-gray-400 group-hover:text-[#ff6b6b]"}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
