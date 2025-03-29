const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login } = require("../controllers/authController");

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: "Too many login attempts. Please try again later.",
  });

router.post("/register", register);
router.post("/login", authLimiter, login);

module.exports = router;
