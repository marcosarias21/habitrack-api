const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    frequency: { type: String, default: "daily" },
    datesDone: [{ type: String }],
    daysOfWeek: [{ type: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
