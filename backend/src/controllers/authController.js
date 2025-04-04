const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const response = await authService.registerUser(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await authService.loginUser(req.body);
    res.json(response);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
