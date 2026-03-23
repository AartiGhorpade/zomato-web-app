const express = require("express");
const app = express();
const authroutes = require("./routes/auth.route");
const partnerAuthRoutes = require("./routes/foodPartnerAuth.route");
const foodRoute = require("./routes/food.route");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/user", authroutes);
app.use("/api/foodPartner", partnerAuthRoutes);
app.use("/api/food", foodRoute);

module.exports = app;
