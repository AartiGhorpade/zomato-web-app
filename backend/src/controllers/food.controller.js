const FoodModel = require("../models/food.model");
const { fileUpload } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    const fileUploadResult = await fileUpload(req.file.buffer, `${uuid()}`);

    const foodItem = await FoodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });
    return res.status(200).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.log("Upload error:", error);
    return res.status(500).json({
      message: "Upload failed",
    });
  }
}

async function getFood(req, res) {
  const foodItems = await FoodModel.find({});

  res
    .status(200)
    .json({ message: "Food Items fetched successfully", foodItems });
}

module.exports = { createFood, getFood };
