const scoreService = require("../services/scoreService");

exports.saveScore = async (req, res) => {
  try {
    const { userId, theme, score, moves, timeTaken } = req.body;

    const response = await scoreService.saveScore(userId, theme, score, moves, timeTaken);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserScores = async (req, res) => {
  try {
    const {userId, theme } = req.query;

    const scores = await scoreService.getUserScores(userId, theme);

    res.json(scores);
  } catch (err) {
    console.error("❌ Error fetching user scores:", err, req);
    res.status(400).json({ error: err.message });
  }
};


exports.getHighestScore = async (req, res) => {
  try {
    const { theme } = req.query;

    const scores = await scoreService.getHighestScore(theme);

    res.json(scores);
  } catch (err) {
    console.error("❌ Error fetching user scores:", err, req);
    res.status(400).json({ error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { theme } = req.query;

    const topPlayers = await scoreService.getTopPlayers(theme);
    res.json(topPlayers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};