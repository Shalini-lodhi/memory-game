const Game = require("../models/Game");

// Save game details
exports.saveGame = async ({userId, user, theme, score, moves, timeTaken}) => {
  try {
    const newGame = new Game({userId, user, theme, score, moves, timeTaken});
    return await newGame.save();
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};
