const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FoodPartner = require("../models/foodPartner.model");

async function registerPartner(req, res) {
  const { email, password, fullname, phone, address, contactname } = req.body;
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
      phone,
      address,
      contactname,
    });

    const token = jwt.sign({ partnerId: partner._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
      message: "Partner created successfully",
      data: {
        id: partner._id,
        name: partner.fullname,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
        contactname: partner.contactname,
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

async function getFoodPartnerProfile(req, res) {
  const partnerId = req.params.id;
  console.log(partnerId);

  try {
    const foodPartner = await FoodPartner.findById(partnerId);
    console.log(foodPartner);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }
    res.status(200).json({
      message: "Partner profile fetched successfully",
      data: foodPartner,
    });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
    console.log("Error while fetching partner profile", e);
  }
}

async function logoutPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Partner logged out successfully" });
}

module.exports = {
  registerPartner,
  loginPartner,
  logoutPartner,
  getFoodPartnerProfile,
};
