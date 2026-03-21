const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ email });

  try {
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, Please login" });
    }

    const userData = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: userData._id,
        fullname: userData.fullname,
        email: userData.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    console.log("Error while creating user", error);
  }
}

async function getUsers(req, res) {
  try {
    const data = await User.find();

    res.status(200).json({ message: "Users fetched successfully", data });
  } catch (error) {
    console.log("error while getting users", error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found, Please sign up" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Please enter correct password" });
    }

    res.status(200).json({ message: "login successfull" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    console.log("Error while login user", error);
  }
}

module.exports = { registerUser, getUsers, loginUser };
