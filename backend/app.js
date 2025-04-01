const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

// const Score = require("./src/models/Score");

const themeRoutes = require("./src/routes/themeRoutes");
const gameRoutes = require("./src/routes/gameRoutes");
const authRoutes = require("./src/routes/authRoutes");
const scoreRoutes = require("./src/routes/scoreRoutes");

const addTheme = require("./scripts/addThemes");

dotenv.config();
const app = express();

//Middleware
app.use(cors()); // Enable CORS to allow frontend requests //{ origin: "http://localhost:5173", credentials: true }

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Handle JSON requests


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

addTheme.uploadThemes();

// Serve static images
app.use(
  "/assets",
  express.static(path.join(__dirname, "../frontend/public/assets"))
);

// Routes
app.use("/api/themes", themeRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes); 

module.exports = app;
