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
    const habitToComplete = await Habit.findByIdAndUpdate(
      id,
      {
        $push: { datesDone: date },
      },
      { new: true }
    );

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

const editHabit = async (req, res) => {
  const { id } = req.params;
  const { name, days, frequency } = req.body;

  try {
    const habitEdit = await Habit.findByIdAndUpdate(id, {
      name,
      daysOfWeek: days,
      frequency,
    });

    await habitEdit.save();

    res.json({
      message: "Habit edited successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { createHabit, getHabit, completeHabit, editHabit };
