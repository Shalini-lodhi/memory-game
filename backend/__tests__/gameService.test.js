const mongoose = require("mongoose");
const Game = require("../src/models/Game");
const { saveGame } = require("../src/services/gameService");

jest.mock("../src/models/Game");

describe("Game Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should save a new game", async () => {
    const mockGame = { save: jest.fn() };
    Game.mockImplementation(() => mockGame);

    await saveGame({ userId: "user1", user: "John", theme: "Animals", score: 120, moves: 5, timeTaken: 60 });

    expect(mockGame.save).toHaveBeenCalled();
  });

  test("should throw error if game save fails", async () => {
    Game.mockImplementation(() => {
      throw new Error("DB Error");
    });

    await expect(saveGame({ userId: "user1", theme: "Animals", score: 120, moves: 5, timeTaken: 60 }))
      .rejects.toThrow("DB Error");
  });
});
