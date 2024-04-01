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

interface ICart extends Document {
  items: ICartItem[];
}

const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      addons: [{ type: Schema.Types.ObjectId, ref: "Addon" }],
      note: { type: String, required: false },
      price: { type: Number, required: true },
      variations: { type: String, required: false },
      total: { type: Number, required: true },
      priceAtTheTime: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<ICart>("Cart", cartSchema);
