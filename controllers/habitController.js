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
  console.log(idUser);
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
    console.log(habits);
    res.json({
      habits,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

const completeHabit = async (req, res) => {
  const { date } = req.body;
  const { id } = req.params;
  console.log(id, date);

  try {
    const habitToComplete = await Habit.findByIdAndUpdate(id, {
      datesDone: [date],
    });
    await habitToComplete.save();
    res.json({
      message: "Habit completed!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { createHabit, getHabit, completeHabit };
