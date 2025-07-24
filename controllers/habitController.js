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
  try {
    const allHabitsToday = await Habit.find({
      user: idUser,
      daysOfWeek: today,
    });

    const habitsNotDone = allHabitsToday.filter(
      (h) => !h.datesDone.includes(date)
    );

    res.json({
      habitsNotDone,
      habitsCompleted: allHabitsToday,
      allHabitsToday: allHabitsToday.length,
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
