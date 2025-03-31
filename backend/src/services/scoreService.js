const Score = require("../models/Score");
const User = require("../models/User");
const Game = require("../models/Game");

exports.saveScore = async (userId, theme, score, moves, timeTaken) => {
  const newScore = new Score({ userId, theme, score, moves, timeTaken });
  await newScore.save();

  const user = await User.findById(userId);
  if (user) {
    const existingScoreIndex = user.scores.findIndex((entry) => entry.theme === theme);

      if (existingScoreIndex !== -1) {
        const existingScore = user.scores[existingScoreIndex];

        if (moves < existingScore.moves || (moves === existingScore.moves && timeTaken < existingScore.timeTaken)) {
          user.scores[existingScoreIndex] = { theme, moves, timeTaken };
        }
      } else {
        user.scores.push({ theme, moves, timeTaken });
      }

    await user.save();
  }
  return { message: "Score saved successfully", newScore };
};

exports.getUserScores = async (userId, theme) => {
  try {
    const scores = await Score.find({ userId, theme }).sort({ score: -1 });

    return scores.length > 0 ? scores[0] : { score: 0 };
  } catch (err) {
    throw new Error("Error fetching user scores: " + err.message);
  }
};

exports.getHighestScore = async (theme) => {
  try {
    const scores = await Score.find({ theme })
      .sort({ scores: -1, moves: 1, timeTaken: 1 })
      .limit(1); // Sort by least moves, then by least timeTaken

    return scores.length > 0 ? scores[0] : { score: 0 };
  } catch (err) {
    throw new Error("Error fetching user scores: " + err.message);
  }
};
exports.getTopPlayers = async (theme) => {
  try {
    const totalPlayers = await Game.countDocuments({ theme }); // Count total players

    // If total players are less than 5, return all; otherwise, return the top 5
    const limit = totalPlayers < 5 ? totalPlayers : 5;

    const topPlayers = await Game.find({ theme })
      .sort({ scores: -1, moves: 1, timeTaken: 1 }) // Sort by least moves and time
      .limit(limit);
    return topPlayers;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error("Failed to fetch leaderboard");
  }
};
