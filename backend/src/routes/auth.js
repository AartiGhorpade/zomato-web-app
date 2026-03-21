const express = require("express");
const { registerUser, getUsers } = require("../controllers/auth.js");
const router = express.Router();

router.post("/user/register", registerUser);
router.get("/users", getUsers);

module.exports = router;
