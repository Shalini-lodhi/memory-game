const gameService = require("../services/gameService");

exports.startGame = async (req, res) => {
  try {
    const { themeId } = req.body;
    const result = await gameService.startGame(themeId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.makeMove = async (req, res) => {
  try {
    const { gameId, cardId } = req.body;
    const result = await gameService.makeMove(gameId, cardId);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGameSummary = async (req, res) => {
  try {
    const { gameId } = req.query;
    const result = await gameService.getGameSummary(gameId);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
