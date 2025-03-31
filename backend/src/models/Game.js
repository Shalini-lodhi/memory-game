const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  user: { type: String, required: true },
  theme: { type: String, required: true },
  score: { type: Number, required: true },
  moves: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Store game completion time
});

module.exports = mongoose.model("Game", GameSchema);