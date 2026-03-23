const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    contactname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const foodPartner = mongoose.model("foodPartner", foodPartnerSchema);

module.exports = foodPartner;
