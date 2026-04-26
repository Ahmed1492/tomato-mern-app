import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const MOCK_DETAILS = {
  tags: (category) => {
    const map = { Salad:["Fresh","Healthy","Low-cal"], Rolls:["Crispy","Snack","Popular"], Deserts:["Sweet","Indulgent","Bestseller"], Sandwich:["Quick Bite","Filling","Classic"], Cake:["Celebration","Sweet","Baked"], "Pure-Veg":["Vegan","Healthy","Light"], Pasta:["Italian","Comfort Food","Filling"], Noodles:["Asian","Spicy","Quick"], Burger:["Juicy","Bestseller","Filling"] };
    return map[category] || ["Delicious","Chef's Pick","Popular"];
  },
  ingredients: (category) => {
    const map = { Salad:["Fresh lettuce","Cherry tomatoes","Cucumber","Olive oil","Lemon dressing"], Rolls:["Flour wrap","Spiced filling","Fresh herbs","Chutney","Onions"], Deserts:["Sugar","Cream","Vanilla","Butter","Eggs"], Sandwich:["Bread","Cheese","Lettuce","Tomato","Mayo"], Cake:["Flour","Sugar","Eggs","Butter","Frosting"], "Pure-Veg":["Seasonal veggies","Spices","Herbs","Oil","Sauce"], Pasta:["Pasta","Tomato sauce","Garlic","Olive oil","Parmesan"], Noodles:["Noodles","Soy sauce","Vegetables","Sesame oil","Chili"], Burger:["Bun","Patty","Cheese","Lettuce","Special sauce"] };
    return map[category] || ["Fresh ingredients","House spices","Special sauce","Garnish"];
  },
};

function getMock(item) {
  const seed = item.name.length;
  return {
    rating: (4 + (seed % 10) / 10).toFixed(1),
    reviews: 80 + (seed * 17) % 420,
    prepTime: `${10 + (seed * 3) % 25} min`,
    calories: `${250 + (seed * 23) % 450} kcal`,
    servings: seed % 3 === 0 ? "2 servings" : "1 serving",
    spicy: seed % 3 === 0,
    veg: seed % 2 === 0,
    tags: MOCK_DETAILS.tags(item.category),
    ingredients: MOCK_DETAILS.ingredients(item.category),
    reviews_list: [
      { user:"Aisha K.", avatar:"🧕", rating:5, comment:`Absolutely loved the ${item.name}! Will order again.`, date:"2 days ago" },
      { user:"James R.", avatar:"👨", rating:4, comment:"Great taste, arrived hot and fresh.", date:"1 week ago" },
      { user:"Priya M.", avatar:"👩", rating:5, comment:"Best in the menu, highly recommend!", date:"2 weeks ago" },
    ],
  };
}

export default function ProductPopup({ item, onClose }) {
  const { cartItems, addToCart, removeFromCart, isFavorite, addToFavorites, removeFromFavorites, token } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState("details");
  const mock = getMock(item);
  const fav = isFavorite(item._id);

  const toggleFavorite = () => {
    if (!token) { toast.info("Please sign in to save favorites"); return; }
    if (fav) { removeFromFavorites(item._id); toast.success("Removed from favorites"); }
    else { addToFavorites(item._id); toast.success("Added to favorites ❤️"); }
  };

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const inCart = cartItems[item._id] > 0;
  const stars = (rating) => Array.from({ length: 5 }, (_, i) => (<span key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col fadeInUp z-10">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <button onClick={toggleFavorite} className={`absolute top-4 right-16 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${fav ? "bg-red-500 text-white" : "bg-white/90 text-gray-400 hover:text-red-500"}`}>
          <svg className="w-5 h-5" fill={fav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="relative h-64 md:h-80 shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">{item.category}</span>
              {mock.veg && <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">🌿 Veg</span>}
              {mock.spicy && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">🌶 Spicy</span>}
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="font-bold text-gray-800 text-sm">{mock.rating}</span>
                <span className="text-gray-500 text-xs">({mock.reviews})</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-1">{item.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⏱ {mock.prepTime}</span><span>•</span><span>🔥 {mock.calories}</span><span>•</span><span>🍽 {mock.servings}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-black gradient-text">${item.price}</p>
                <p className="text-xs text-gray-400">per serving</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {mock.tags.map(tag => (<span key={tag} className="px-3 py-1 bg-[#ff6b6b]/10 text-[#ff6b6b] text-xs font-semibold rounded-full">{tag}</span>))}
            </div>

            <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6">
              {["details","ingredients","reviews"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${activeTab === tab ? "bg-white text-[#ff6b6b] shadow-md" : "text-gray-500 hover:text-gray-700"}`}>{tab}</button>
              ))}
            </div>

            <div className="min-h-[120px]">
              {activeTab === "details" && (
                <div className="fadeIn space-y-4">
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[["⏱","Prep Time",mock.prepTime],["🔥","Calories",mock.calories],["🍽","Servings",mock.servings],["⭐","Rating",`${mock.rating}/5`]].map(([icon,label,value]) => (
                      <div key={label} className="bg-gray-50 rounded-2xl p-3 text-center">
                        <div className="text-2xl mb-1">{icon}</div>
                        <p className="text-xs text-gray-500 mb-1">{label}</p>
                        <p className="font-bold text-gray-800 text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "ingredients" && (
                <div className="fadeIn">
                  <p className="text-sm text-gray-500 mb-4">Key ingredients used in this dish:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {mock.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                        <span className="w-2 h-2 bg-[#ff6b6b] rounded-full shrink-0" />
                        <span className="text-sm text-gray-700">{ing}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">* Ingredients may vary slightly. Please inform us of any allergies.</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="fadeIn space-y-4">
                  <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-2">
                    <div className="text-center">
                      <p className="text-4xl font-black gradient-text">{mock.rating}</p>
                      <div className="flex justify-center text-lg">{stars(mock.rating)}</div>
                      <p className="text-xs text-gray-500 mt-1">{mock.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[5,4,3].map(s => (
                        <div key={s} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-4">{s}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] h-2 rounded-full" style={{ width: s===5?"70%":s===4?"20%":"10%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {mock.reviews_list.map((r, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] flex items-center justify-center text-xl shrink-0">{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-800 text-sm">{r.user}</p>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="flex text-yellow-400 text-sm mb-1">{stars(r.rating)}</div>
                        <p className="text-gray-600 text-sm">{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white px-6 md:px-8 py-4 flex items-center gap-4 shrink-0">
          {inCart ? (
            <>
              <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                <button onClick={() => removeFromCart(item._id)} className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/></svg>
                </button>
                <span className="px-4 font-black text-gray-800 text-lg min-w-[2rem] text-center">{cartItems[item._id]}</span>
                <button onClick={() => addToCart(item._id)} className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                </button>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">In your cart</p>
                <p className="font-bold text-gray-800">${(item.price * cartItems[item._id]).toFixed(2)} total</p>
              </div>
              <button onClick={onClose} className="btn-primary text-white font-bold px-6 py-3 rounded-full">View Cart →</button>
            </>
          ) : (
            <>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Price per serving</p>
                <p className="text-2xl font-black gradient-text">${item.price}</p>
              </div>
              <button onClick={() => addToCart(item._id)} className="btn-primary text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
