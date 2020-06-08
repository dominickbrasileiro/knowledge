import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  users: Number,
  categories: Number,
  articles: Number,
  createdAt: Date,
}, { timestamps: true });

export default mongoose.model('Stat', statSchema);
