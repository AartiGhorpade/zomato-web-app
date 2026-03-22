const FoodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await FoodPartnerModel.findById(decoded.userId);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid User" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Invalid User" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.userId);

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid User" });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
