import User from "../../db/models/user.model.js";

export const addFavorite = async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.userId);
    const favorites = user.favorites || [];
    if (!favorites.includes(itemId)) {
      favorites.push(itemId);
      await User.findByIdAndUpdate(req.userId, { favorites });
    }
    return res.json({ success: true, favorites, message: "Added to favorites" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.userId);
    const favorites = (user.favorites || []).filter(id => id !== itemId);
    await User.findByIdAndUpdate(req.userId, { favorites });
    return res.json({ success: true, favorites, message: "Removed from favorites" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    return res.json({ success: true, favorites: user.favorites || [] });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
