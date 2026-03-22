const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FoodPartner = require("../models/foodPartner.model");

async function registerPartner(req, res) {
  const { email, password, fullname } = req.body;
  const existingPartner = await FoodPartner.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    if (existingPartner) {
      return res
        .status(400)
        .json({ message: "User already exists,Please login" });
    }

    const partner = await FoodPartner.create({
      email,
      fullname,
      password: hashPassword,
    });

    const token = jwt.sign({ partnerId: partner._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
      message: "Partner created successfully",
      data: {
        id: partner._id,
        name: partner.fullname,
        email: partner.email,
      },
    });
  } catch (error) {
    console.log("Error while creating partner", error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function loginPartner(req, res) {
  const { email, password } = req.body;
  const existingPartner = await FoodPartner.findOne({ email });

  try {
    if (!existingPartner) {
      return res
        .status(400)
        .json({ message: "User not found, Please register" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingPartner.password,
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: existingPartner._id },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token);
    res.status(200).json({ message: "Partner login successfull" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    console.log("Error while login user", error);
  }
}

async function logoutPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Partner logged out successfully" });
}

module.exports = { registerPartner, loginPartner, logoutPartner };
