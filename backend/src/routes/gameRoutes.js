const express = require("express");
const { startGame, makeMove, getGameSummary } = require("../controllers/gameController");

const router = express.Router();

router.post("/start", startGame);
router.post("/move", makeMove);
router.get("/summary", getGameSummary);
router.get("/", (req, res) => {
    res.json({ message: "Game API is working!" });
  });

module.exports = router;
