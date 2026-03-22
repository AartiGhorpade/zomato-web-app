const express = require("express");
const router = express.Router();
const { createFood, getFood } = require("../controllers/food.controller");
const {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

router.get("/", authUserMiddleware, getFood);

module.exports = router;
