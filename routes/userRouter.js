const express = require("express");
const {
  registerUser,
  loginUser,
  authMiddleware,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", authMiddleware);

module.exports = router;
