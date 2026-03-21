const express = require("express");
const { registerUser, getUsers, loginUser } = require("../controllers/auth.js");
const router = express.Router();

router.post("/user/register", registerUser);
router.get("/users", getUsers);
router.post("/user/login", loginUser);

module.exports = router;
