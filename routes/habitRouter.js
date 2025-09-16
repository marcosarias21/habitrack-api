const express = require("express");
const {
  createHabit,
  getHabit,
  completeHabit,
  editHabit,
  getAllHabits,
} = require("../controllers/habitController");

const router = express.Router();

router
  .post("/createHabit", createHabit)
  .get("/getHabits", getHabit)
  .put("/completeHabit/:id", completeHabit)
  .put("/editHabit/:id", editHabit)
  .get("/allHabits/:idUser", getAllHabits);

module.exports = router;
