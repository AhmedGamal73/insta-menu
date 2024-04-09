import mongoose, { Schema, Document } from "mongoose";

// customer types
export interface IRestaurantUser extends Document {
  name: string;
  username: string;
  restaurantId: string;
  phone: string;
  password: string;
}

// customer schema
const restaurantUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model<IRestaurantUser>(
  "RestaurantUser",
  restaurantUserSchema
);
