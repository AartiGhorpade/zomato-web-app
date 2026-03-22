const express = require("express");
const {
  registerPartner,
  loginPartner,
  logoutPartner,
} = require("../controllers/foodPartnerAuth.controller");
const route = express.Router();

route.post("/register", registerPartner);
route.post("/login", loginPartner);
route.post("/logout", logoutPartner);

module.exports = route;
