// const mongoose = require("mongoose");

// const GameSessionSchema = new mongoose.Schema({
//   theme: { type: mongoose.Schema.Types.ObjectId, ref: "Theme", required: true },
//   revealedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
//   matchedPairs: { type: Number, default: 0 },
//   moves: { type: Number, default: 0 },
//   score: { type: Number, default: 0 },
//   start_time: { type: Date, default: Date.now },
//   end_time: { type: Date }
// });

// module.exports = mongoose.model("GameSession", GameSessionSchema);
const mongoose = require("mongoose");

const GameSessionSchema = new mongoose.Schema({
  theme_id: { type: mongoose.Schema.Types.ObjectId, ref: "Theme", required: true },
  score: { type: Number, default: 0 },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date, default: null },
});

module.exports = mongoose.model("GameSession", GameSessionSchema);
