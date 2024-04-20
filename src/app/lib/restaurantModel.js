const { default: mongoose } = require("mongoose");

const restaurantModel = new mongoose.Schema({
  email: String,
  password: String,
  restaurantName: String,
  city: String,
  fullAddress: String,
  contactNumber: Number,
});

export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
