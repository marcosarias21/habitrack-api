require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const DB = process.env.DB;
  try {
    await mongoose.connect(DB);
    console.log("DB conectada!");
  } catch (error) {
    console.log(Error);
  }
};

mongoose.set("strictQuery", true);

connectDB();
