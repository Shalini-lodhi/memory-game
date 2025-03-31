const express = require("express");
const { saveGameDetails, getLeaderboard } = require("../controllers/gameController");

const router = express.Router();

router.post("/save", saveGameDetails); // Route to save game details

module.exports = router;
