const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/register", registerUser);
router.get("/all", getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
