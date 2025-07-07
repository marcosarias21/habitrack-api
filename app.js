require("./database/db");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const habitRoute = require("./routes/habitRouter");
const userRoute = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/habit", habitRoute);
app.use("/user", userRoute);

mongoose.set("strictQuery", true);

module.exports = app;
