const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    datesDone: [{ type: Date }],
    frequency: { type: String, default: "daily" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
