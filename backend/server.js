import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import foodRouter from './src/router/food.router.js';
import userRouter from './src/router/user.router.js';
import cartRouter from './src/router/cart.router.js';
import orderRouter from './src/router/order.router.js';
import favoritesRouter from './src/router/favorites.router.js';
import connectCloudinary from './src/config/cloudinary.js';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/food', foodRouter);
app.use('/api/auth', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/favorites', favoritesRouter);

app.get('/', (req, res) => res.send('Food Flow API is running ✅'));

const startConnections = async () => {
  try {
    await connectDB();
    connectCloudinary();
    console.log("DB & Cloudinary connected!");
  } catch (err) {
    console.error("Connection Error:", err);
  }
};
startConnections();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
