import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRestaurant extends Document {
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  restaurantManager: string;
}

const restaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },
    restaurantAddress: { type: String, required: true },
    restaurantPhone: { type: String, required: true },
    restaurantManager: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
