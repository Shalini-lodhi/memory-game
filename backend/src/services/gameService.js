const GameSession = require("../models/GameSession");
const Card = require("../models/Card");

class GameService {
  async startGame(themeId) {
    try {
      const newGame = new GameSession({ theme: themeId });
      await newGame.save();
      return { success: true, gameId: newGame._id };
    } catch (error) {
      throw new Error("Error starting game");
    }
  }

  async makeMove(gameId, cardId) {
    try {
      const game = await GameSession.findById(gameId).populate("revealedCards");
      const card = await Card.findById(cardId);

      if (!game || !card) {
        return { success: false, message: "Invalid game or card" };
      }

      if (game.revealedCards.length === 2) {
        game.revealedCards = []; // Reset revealed cards before new move
      }

      game.revealedCards.push(card);
      game.moves++;

      if (game.revealedCards.length === 2) {
        // Check if the two revealed cards match
        const [first, second] = game.revealedCards;
        if (first.word === second.word) {
          game.matchedPairs++;
          game.score += 10; // Reward for correct match
          game.revealedCards = [];
        } else {
          setTimeout(() => {
            game.revealedCards = []; // Hide after a delay
          }, 2000);
        }
      }

      // Check if game is complete
      if (game.matchedPairs * 2 === 36) {
        game.end_time = new Date();
      }

      await game.save();
      return { success: true, game };
    } catch (error) {
      throw new Error("Error processing move");
    }
  }

  async getGameSummary(gameId) {
    try {
      const game = await GameSession.findById(gameId);

      if (!game) {
        return { success: false, message: "Game not found" };
      }

      return {
        success: true,
        data: {
          score: game.score,
          moves: game.moves,
          startTime: game.start_time,
          endTime: game.end_time,
        },
      };
    } catch (error) {
      throw new Error("Error fetching summary");
    }
  }
}

module.exports = new GameService();
