require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const path = require("path");

const themeRoutes = require("./src/routes/themeRoutes");
const gameRoutes = require("./src/routes/gameRoutes");

const app = express();

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS to allow frontend requests
app.use(express.json()); // Handle JSON requests

connectDB();

// Serve static images
app.use("/assets", express.static(path.join(__dirname, "../frontend/public/assets")));


// Routes
app.use("/api/themes", themeRoutes);
app.use("/api/games", gameRoutes);

module.exports = app;
