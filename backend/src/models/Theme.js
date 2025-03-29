const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: { type: [String], required: true }, // Ensure images are stored as an array
});

module.exports = mongoose.model("Theme", ThemeSchema);
