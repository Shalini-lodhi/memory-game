const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  theme_id: { type: mongoose.Schema.Types.ObjectId, ref: "Theme", required: true },
  word: { type: String, required: true },
  is_active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Card", CardSchema);
