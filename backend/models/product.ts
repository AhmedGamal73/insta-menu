import mongoose, { Schema, Document } from "mongoose";
import { Iingredients } from "./ingredients";

const sizeSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
});

export interface IProduct extends Document {
  _id: string;
  name: string;
  price?: number;
  salePrice?: number;
  description: string;
  imgURL?: string;
  category: string;
  calories: number;
  ingredients?: Iingredients["_id"][];
  rating?: number;
  status?: boolean;
  sizes?: [{ type: Schema.Types.ObjectId; ref: "Size"; required: false }][];
  variable?: boolean;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false, default: null },
  salePrice: { type: Number, required: false, default: null },
  description: { type: String, required: false },
  variable: { type: Boolean, required: false, default: false },
  imgURL: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  calories: { type: Number, required: false },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: false,
    },
  ],
  rating: { type: Number, default: 0, required: false },
  status: { type: Boolean, default: true, required: true },
  sizes: [{ type: Object, ref: "Size", required: false }],
});

export default mongoose.model<IProduct>("Product", productSchema);
