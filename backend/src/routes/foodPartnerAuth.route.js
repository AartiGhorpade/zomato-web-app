const express = require("express");
const {
  registerPartner,
  loginPartner,
  logoutPartner,
  getFoodPartnerProfile,
} = require("../controllers/foodPartnerAuth.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");
const route = express.Router();

route.post("/register", registerPartner);
route.post("/login", loginPartner);
route.post("/logout", logoutPartner);
route.get("/:id", authFoodPartnerMiddleware, getFoodPartnerProfile);

module.exports = route;
