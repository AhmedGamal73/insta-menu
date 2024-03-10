import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem extends Document {
  productId: string;
  quantity: number;
  addons?: string[];
  notes?: string;
  price: number;
  variant?: string;
  priceAtTheTime: number;
}

const ICartItem = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  addons: [{ type: Schema.Types.ObjectId, ref: "Addon" }],
  note: { type: String, required: false },
  price: { type: Number, required: true },
  variant: { type: String, required: false },
  priceAtTheTime: { type: Number, required: true },
});

export default mongoose.model<ICartItem>("CartItem", ICartItem);
