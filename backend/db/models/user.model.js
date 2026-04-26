import mongoose, { Schema } from 'mongoose';
const userSchem = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  image: { type: String, required: false },
  public_id: { type: String, required: false },
  favorites: { type: [String], default: [] },
}, { minimize: false, timestamps: true });

const User = mongoose.models.user || mongoose.model('User', userSchem);
export default User;