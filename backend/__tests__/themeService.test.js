const mongoose = require("mongoose");
const ThemeService = require("../src/services/ThemeService");
const Theme = require("../src/models/Theme");

jest.mock("../src/models/Theme");

describe("ThemeService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch all themes", async () => {
    const mockThemes = [{ name: "Animals", icon_url: "animal.png" }];
    Theme.find.mockResolvedValue(mockThemes);

    const result = await ThemeService.getAllThemes();
    expect(result).toEqual({ success: true, themes: mockThemes });
    expect(Theme.find).toHaveBeenCalled();
  });

  test("should add a new theme", async () => {
    const mockTheme = { name: "Fruits", icon_url: "fruit.png", save: jest.fn() };
    Theme.mockImplementation(() => mockTheme);

    const result = await ThemeService.addTheme("Fruits", "fruit.png");
    expect(result).toEqual({ success: true, theme: mockTheme });
    expect(mockTheme.save).toHaveBeenCalled();
  });

  test("should throw an error when fetching themes fails", async () => {
    Theme.find.mockRejectedValue(new Error("DB Error"));

    await expect(ThemeService.getAllThemes()).rejects.toThrow("Error fetching themes");
  });

  test("should throw an error when adding a theme fails", async () => {
    Theme.mockImplementation(() => {
      throw new Error("DB Error");
    });

    await expect(ThemeService.addTheme("Sports", "sports.png")).rejects.toThrow("Error adding theme");
  });
});
