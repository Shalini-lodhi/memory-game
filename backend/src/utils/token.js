const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure environment variables are loaded

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
