const Theme = require("../models/Theme");

class ThemeService {
  async getAllThemes() {
    try {
      const themes = await Theme.find({});
      return { success: true, themes };
    } catch (error) {
      throw new Error("Error fetching themes");
    }
  }

  async addTheme(name, icon_url) {
    try {
      const newTheme = new Theme({ name, icon_url });
      await newTheme.save();
      return { success: true, theme: newTheme };
    } catch (error) {
      throw new Error("Error adding theme");
    }
  }
}

module.exports = new ThemeService();
