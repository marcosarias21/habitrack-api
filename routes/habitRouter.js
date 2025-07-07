const express = require("express");
const { createHabit } = require("../controllers/habitController");

const router = express.Router();

router.post("/createHabit", createHabit);

module.exports = router;
