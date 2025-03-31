const express = require("express");
const { saveScore, getUserScores, getHighestScore,getLeaderboard } = require("../controllers/scoreController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/save", authMiddleware, saveScore);
router.get("/user-scores", authMiddleware, getUserScores);
router.get("/highest-score", getHighestScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
