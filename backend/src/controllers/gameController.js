const gameService = require("../services/gameService");

// Save game details
exports.saveGameDetails = async (req, res) => {
  try {
    const savedGame = await gameService.saveGame(req.body);
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: "Error saving game", error });
  }
};