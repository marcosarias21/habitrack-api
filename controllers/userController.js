const User = require("../models/user");

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

module.exports = { registerUser };
