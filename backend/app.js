const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const themeRoutes = require("./src/routes/themeRoutes");
const gameRoutes = require("./src/routes/gameRoutes");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express();

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS to allow frontend requests
app.use(express.json()); // Handle JSON requests

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Serve static images
app.use(
  "/assets",
  express.static(path.join(__dirname, "../frontend/public/assets"))
);

// Routes
app.use("/api/themes", themeRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
