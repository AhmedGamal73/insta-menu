import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  itemId: string;
  quantity: number;
  addons?: string[];
  note: string;
  price: number;
  variations?: string;
  priceAtTheTime: number;
}

const cartItemSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  addons: [{ type: Schema.Types.ObjectId, ref: "Addon" }],
  note: { type: String, required: false },
  price: { type: Number, required: true },
  variations: { type: String, required: false },
  priceAtTheTime: { type: Number, required: true },
});

interface ICart extends Document {
  customerId: string;
  items: ICartItem[];
}

const cartSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  items: [cartItemSchema],
});

export default mongoose.model<ICart>("Cart", cartSchema);
