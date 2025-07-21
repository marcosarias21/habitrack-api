const express = require("express");
const {
  createHabit,
  getHabit,
  completeHabit,
} = require("../controllers/habitController");

const router = express.Router();

router
  .post("/createHabit", createHabit)
  .get("/getHabits", getHabit)
  .put("/completeHabit/:id", completeHabit);

module.exports = router;
