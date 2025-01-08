import mongoose, { Document } from "mongoose"; // Import Document from mongoose

interface IRestaurant extends Document {
  title: string;
  slug: string;
  bgImg: string;
  categories: string[];
  tags: string[];
  orders: string[];
  products: string[];
  openingHours: string;
  closingHours: string;
}

export const RestaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  tags: [{ type: String, required: false }],
  bgImg: { type: String, required: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] },
  ],
  openingHours: { type: String, required: false },
  closingHours: { type: String, required: false },
});

// Register the model dynamically in the tenant's context
const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;