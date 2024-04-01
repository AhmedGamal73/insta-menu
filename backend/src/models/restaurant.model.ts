const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoURL: { type: String, required: false },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
