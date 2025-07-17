const express = require("express");
const { createHabit, getHabit } = require("../controllers/habitController");

const router = express.Router();

router.post("/createHabit", createHabit).get("/getHabits", getHabit);

module.exports = router;
