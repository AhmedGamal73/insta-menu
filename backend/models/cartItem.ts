import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem extends Document {
  product: string;
  quantity: number;
  addons: string[];
  notes: string;
  price: number;
  size: string;
  priceAtTheTime: number;
}

const ICartItem = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  addons: [{ type: Schema.Types.ObjectId, ref: "Addon" }],
  notes: { type: String, required: false },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  priceAtTheTime: { type: Number, required: true },
});

export default mongoose.model<ICartItem>("CartItem", ICartItem);
