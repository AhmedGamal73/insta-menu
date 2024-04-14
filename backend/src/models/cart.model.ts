import mongoose, { Document, Schema } from "mongoose";

interface IProduct {
  _id: string;
  name: string;
  imgURL: string;
  price: number;
  salePrice: number;
  category: string;
  restaurantId: string;
}

interface Variant {
  name: string;
  price: number;
  salePrice: number;
  _id: string;
}

interface ICartItem {
  product: IProduct;
  quantity: number;
  addons?: string[];
  note: string;
  total: number;
  variations?: Variant[];
  priceAtTheTime: number;
}

interface ICart extends Document {
  items: ICartItem[];
  total: number;
  createdAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product: {
    id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    imgURL: { type: String, required: false },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: false },
    clickId: { type: String, required: true, default: "123" },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  },
  quantity: { type: Number, required: true, default: 1 },
  addons: [
    {
      price: { type: Number, required: true },
      name: { type: String, required: true },
      _id: { type: String, required: true },
      clickId: { type: String, required: true, default: "123" },
    },
  ],
  total: { type: Number, required: true },
  variations: [
    {
      _id: false,
      name: { type: String, required: false },
      price: { type: Number, required: false },
      clickId: { type: String, required: true, default: "123" },
      salePrice: { type: Number, required: false },
    },
  ],
  note: { type: String, required: false },
  priceAtTheTime: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
