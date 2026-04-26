import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ProductPopup from "./ProductPopup";
import { toast } from "react-toastify";

const Food_Item = ({ item, url }) => {
  const { cartItems, addToCart, removeFromCart, isFavorite, addToFavorites, removeFromFavorites, token } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);

  const fav = isFavorite(item._id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (!token) { toast.info("Please sign in to save favorites"); return; }
    if (fav) {
      removeFromFavorites(item._id);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(item._id);
      toast.success("Added to favorites ❤️");
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
        onClick={() => setShowPopup(true)}
      >
        <div className="relative">
          <img
            src={`${item.image}`}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
              {item.category}
            </span>
          </div>

          {/* Heart button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
              fav ? "bg-red-500 text-white" : "bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500"
            }`}
          >
            <svg className="w-4 h-4" fill={fav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Quick View
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{item.name}</h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-black gradient-text">${item.price}</span>

            {cartItems[item._id] ? (
              <div
                className="flex items-center gap-2 bg-gray-100 rounded-full p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-2 font-bold text-gray-800 text-sm min-w-[1.5rem] text-center">{cartItems[item._id]}</span>
                <button
                  onClick={() => addToCart(item._id)}
                  className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(item._id); }}
                className="btn-primary text-white font-semibold px-5 py-2 rounded-full text-sm hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
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

      {showPopup && <ProductPopup item={item} onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Food_Item;
