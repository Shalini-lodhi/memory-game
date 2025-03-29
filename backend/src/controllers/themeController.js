const themeService = require("../services/themeService");

exports.getThemes = async (req, res) => {
  try {
    const themes = await themeService.getAllThemes();
    res.status(200).json({ success: true, themes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTheme = async (req, res) => {
  try {
    const { name, icon_url } = req.body;
    const theme = await themeService.addTheme(name, icon_url);
    res.status(201).json({ success: true, theme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
