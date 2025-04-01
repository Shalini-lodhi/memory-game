const mongoose = require("mongoose");
const Score = require("../src/models/Score");
const User = require("../src/models/User");
const Game = require("../src/models/Game");
const {
  saveScore,
  getUserScores,
  getHighestScore,
  getTopPlayers,
} = require("../src/services/scoreService");

jest.mock("../src/models/Score");
jest.mock("../src/models/User");
jest.mock("../src/models/Game");

describe("Score Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should save a new score", async () => {
    const mockUser = { scores: [], save: jest.fn() };
    const mockScore = { save: jest.fn() };

    Score.mockImplementation(() => mockScore);
    User.findById.mockResolvedValue(mockUser);

    const result = await saveScore("user1", "Animals", 100, 5, 60);
    expect(result.message).toBe("Score saved successfully");
    expect(mockScore.save).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalled();
  });

  test("should return user scores sorted by highest score", async () => {
    const mockScores = [{ score: 120 }, { score: 100 }];
    Score.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockScores),
    });

    const result = await getUserScores("user1", "Animals");
    expect(result).toEqual(mockScores[0]);
    expect(Score.find).toHaveBeenCalled();
  });

  test("should return 0 if no scores found", async () => {
    Score.find.mockReturnValue({ sort: jest.fn().mockResolvedValue([]) });

    const result = await getUserScores("user1", "Animals");
    expect(result).toEqual({ score: 0 });
  });

  test("should return highest score for a theme", async () => {
    const mockScores = [{ score: 90 }];
    Score.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockScores),
    });

    const result = await getHighestScore("Animals");
    expect(result).toEqual(mockScores[0]);
  });

  test("should return an empty score object if no scores found", async () => {
    Score.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    });
  
    const result = await getHighestScore("Animals");
    expect(result).toEqual({ score: 0 });
  });
  
  test("should get top players", async () => {
    const mockTotalPlayers = 3; // Less than 5, so all should be returned
    const mockPlayers = [
      { userId: "1", score: 120, moves: 5, timeTaken: 60 },
      { userId: "2", score: 100, moves: 6, timeTaken: 50 },
    ];
  
    Game.countDocuments.mockResolvedValue(mockTotalPlayers); // Mock count of players
  
    Game.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockPlayers),
    });
  
    const result = await getTopPlayers("Animals");
    expect(result).toEqual(mockPlayers);
  });
});
  
