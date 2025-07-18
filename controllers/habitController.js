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
  const { idUser, today, date } = req.query;
  console.log(idUser, today, date);
  try {
    const habits = await Habit.find({
      user: idUser,
      daysOfWeek: today,
      $or: [
        { datesDone: { $exists: false } },
        { datesDone: { $eq: [] } },
        { datesDone: { $nin: [date] } },
      ],
    });
    res.json({
      habits,
    });
    console.log(habits);
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { createHabit, getHabit };
