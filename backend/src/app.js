const express = require("express");
const app = express();
const authroutes = require("./routes/auth");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use("/api", authroutes);

module.exports = app;
