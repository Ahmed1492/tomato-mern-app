import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const SearchBar = ({ onClose }) => {
  const { data } = useContext(StoreContext);
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen]         = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setSuggestions(data.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase())).slice(0,6));
      setIsOpen(true);
    } else { setSuggestions([]); setIsOpen(false); }
  }, [query, data]);

  const handleSearch = (q = query) => {
    if (!q.trim()) return;
    const updated = [q.trim(), ...recentSearches.filter(s => s !== q.trim())].slice(0,5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden fadeIn">
        <div className="relative p-6 border-b border-gray-100">
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if(e.key==="Enter") handleSearch(); if(e.key==="Escape") onClose(); }}
            placeholder="Search for dishes, categories, or ingredients..."
            className="w-full px-6 py-4 pl-14 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300 text-lg" />
          <svg className="absolute left-11 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <button onClick={onClose} className="absolute right-11 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">QUICK SEARCH</h3>
              <div className="flex flex-wrap gap-2">
                {["Pizza","Burger","Salad","Dessert","Pasta"].map(t => (
                  <button key={t} onClick={() => handleSearch(t)} className="px-4 py-2 bg-gray-100 hover:bg-[#ff6b6b] hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all duration-300">{t}</button>
                ))}
              </div>
            </div>
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">RECENT SEARCHES</h3>
                <div className="space-y-2">
                  {recentSearches.map((s,i) => (
                    <button key={i} onClick={() => handleSearch(s)} className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg text-left transition-all duration-300">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span className="text-gray-700 text-sm">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">SUGGESTIONS</h3>
            <div className="space-y-2">
              {suggestions.map(item => (
                <button key={item._id} onClick={() => handleSearch(item.name)} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 text-left">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.category} · ${item.price}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
