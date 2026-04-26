import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const menu_list = [
  { menu_name: "salad",    menu_image: "/menu_1.png" },
  { menu_name: "Rolls",    menu_image: "/menu_2.png" },
  { menu_name: "Deserts",  menu_image: "/menu_3.png" },
  { menu_name: "Sandwich", menu_image: "/menu_4.png" },
  { menu_name: "Cake",     menu_image: "/menu_5.png" },
  { menu_name: "Pure-Veg", menu_image: "/menu_6.png" },
  { menu_name: "Pasta",    menu_image: "/menu_7.png" },
  { menu_name: "Noodles",  menu_image: "/menu_8.png" },
];

const URL = "http://localhost:4000";

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems]   = useState({});
  const [token, setToken]           = useState("");
  const [data, setData]             = useState([]);
  const [userData, setUserData]     = useState({});
  const [foodLoading, setFoodLoading] = useState(false);
  const [favorites, setFavorites]   = useState([]);

  const url = URL;

  const addToCart = async (itemId) => {
    setCartItems(p => ({ ...p, [itemId]: (p[itemId] || 0) + 1 }));
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        await fetchCardData();
      } catch(e) { console.log(e); }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(p => ({ ...p, [itemId]: p[itemId] - 1 }));
    if (token) {
      try {
        await axios.put(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        await fetchCardData();
      } catch(e) { console.log(e); }
    }
  };

  const cartTotal = () => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = data.find(i => i._id === id);
        if (item) total += item.price * cartItems[id];
      }
    }
    return total;
  };

  const getFoods = async () => {
    try {
      setFoodLoading(true);
      const res = await axios.get(`${url}/api/food/get`);
      setData(res.data.food);
    } catch(e) { console.log(e); }
    finally { setFoodLoading(false); }
  };

  const fetchCardData = async () => {
    try {
      const res = await axios.get(`${url}/api/cart/get`, { headers: { token } });
      setCartItems(res?.data?.userCart || {});
    } catch(e) { console.log(e); }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/user-data`, { headers: { token } });
      setUserData(res.data.user);
    } catch(e) { console.log(e); }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${url}/api/favorites/get`, { headers: { token } });
      setFavorites(res.data.favorites || []);
    } catch(e) { console.log(e); }
  };

  const addToFavorites = async (itemId) => {
    setFavorites(p => [...p, itemId]);
    if (token) {
      try { await axios.post(`${url}/api/favorites/add`, { itemId }, { headers: { token } }); }
      catch(e) { console.log(e); }
    }
  };

  const removeFromFavorites = async (itemId) => {
    setFavorites(p => p.filter(id => id !== itemId));
    if (token) {
      try { await axios.delete(`${url}/api/favorites/remove`, { data: { itemId }, headers: { token } }); }
      catch(e) { console.log(e); }
    }
  };

  const isFavorite = (itemId) => favorites.includes(itemId);

  useEffect(() => { getFoods(); }, []);

  useEffect(() => {
    const saved = localStorage.getItem("food_flow_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) { fetchCardData(); fetchUserData(); fetchFavorites(); }
  }, [token]);

  return (
    <StoreContext.Provider value={{
      url, cartItems, setCartItems, token, setToken,
      data, setData, userData, fetchUserData,
      addToCart, removeFromCart, cartTotal, foodLoading,
      menu_list,
      favorites, addToFavorites, removeFromFavorites, isFavorite,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
export default StoreContextProvider;
