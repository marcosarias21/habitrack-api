const Habit = require("../models/habits");

const createHabit = async (req, res) => {
  const { idUser, name, frequency } = req.body;
  try {
    const habit = new Habit({
      user: idUser,
      name,
      frequency,
    });
    await habit.save();
    res.json({
      message: "Habit created!",
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { createHabit };
