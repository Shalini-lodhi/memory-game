const express = require("express");
const {
  startGame,
  makeMove,
  getGameSummary,
} = require("../controllers/gameController");
const GameSession = require("../models/GameSession");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected game routes
router.post("/start", authMiddleware, startGame);
router.post("/move", authMiddleware, makeMove);
router.get("/summary", authMiddleware, getGameSummary);

// Health check route
router.get("/", (req, res) => {
  res.json({ message: "Game API is working!" });
});

// Get user game history (Protected)
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract from JWT token
    const history = await GameSession.find({ user: userId }).sort({
      end_time: -1,
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game history" });
  }
});

module.exports = router;
