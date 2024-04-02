const mongoose = require("mongoose");

interface IRestaurant extends Document {
  name: string;
  logoURL: string;
  qrcode: string;
  orders: string[];
  openingHours: string;
  closingHours: string;
}

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoURL: { type: String, required: false },
  qrcode: { type: String, required: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  openingHours: { type: String, required: false },
  closingHours: { type: String, required: false },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
