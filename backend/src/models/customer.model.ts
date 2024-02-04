import mongoose, { Schema, Document } from "mongoose";

// customer types
export interface ICustomer extends Document {
  name: string;
  phone: string;
  type: string;
  address?: string;
  cart: string;
  orders: string[];
}

// customer schema
const customerSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    cart: {
      type: Schema.ObjectId,
      ref: "Cart",
      required: false,
    },
    orders: [
      {
        type: Schema.ObjectId,
        ref: "Order",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
