import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { addFavorite, removeFavorite, getFavorites } from "../controller/favorites.controller.js";

const router = Router();

router.post("/add", authMiddleware, addFavorite);
router.delete("/remove", authMiddleware, removeFavorite);
router.get("/get", authMiddleware, getFavorites);

export default router;
