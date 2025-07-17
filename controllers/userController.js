const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
    res.status(200).json({
      message: "User registered succesfully!",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogged = await User.findOne({ email });
    if (!userLogged) {
      res.json({ message: "User not encountered" });
    }
    const match = password === userLogged.password;
    if (match) {
      const token = jwt.sign({ userLogged }, secretKey);
      res.json({
        message: "Login succesfully",
        token,
      });
    }
  } catch (error) {
    res.json({ error });
  }
};

const authMiddleware = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.json({ message: "Not found token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token, secretKey);
    const user = await User.findById(decoded.userLogged._id).select(
      "-password"
    );
    res.json({
      user,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { registerUser, loginUser, authMiddleware };
