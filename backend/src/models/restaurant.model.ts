const mongoose = require("mongoose");

interface IRestaurant extends Document {
  title: string;
  slug: string;
  bgImg: string;
  // logoURL: string;
  categories: string[];
  tags: string[];
  // qrcode: string;
  orders: string[];
  products: string[];
  openingHours: string;
  closingHours: string;
}

const RestaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  // subtitle: { type: String, required: false },
  tags: [{ type: String, required: false }],
  bgImg: { type: String, required: false },
  // logoURL: { type: String, required: false },
  // qrcode: { type: String, required: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] },
  ],
  openingHours: { type: String, required: false },
  closingHours: { type: String, required: false },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
