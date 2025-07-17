const Habit = require("../models/habits");

const createHabit = async (req, res) => {
  const { idUser, name, frequency, daysOfWeek } = req.body;
  try {
    const habit = new Habit({
      user: idUser,
      name,
      frequency,
      daysOfWeek,
    });
    await habit.save();
    res.status(200).json({
      message: "Habit created!",
    });
  } catch (error) {
    res.json({ error });
  }
};

const getHabit = async (req, res) => {
  const { idUser, today } = req.query;

  try {
    const habit = await Habit.find({ user: idUser, daysOfWeek: today });
    res.json({
      habit,
    });
    console.log(habit);
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { createHabit, getHabit };
