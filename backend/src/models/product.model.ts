import mongoose, { Schema, Document } from "mongoose";
import { Iingredients } from "./ingredients";

interface option {
  active: boolean;
  name: string;
  price: number;
  salePrice?: number;
}

const optionSchema = new Schema({
  active: { type: Boolean, default: true, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
});

interface Ivariation {
  name: string;
  options: option[];
}

const variationSchema = new Schema({
  name: { type: String, required: true },
  options: [optionSchema],
});

export interface IProduct extends Document {
  _id: string;
  name: string;
  price?: number;
  salePrice?: number;
  description: string;
  imgURL?: string;
  category: string;
  subcategory?: string;
  calories: number;
  ingredients?: Iingredients["_id"][];
  rating?: number;
  active?: boolean;
  variations?: Ivariation[];
  variable?: boolean;
  addonCategory?: string;
  addons?: [];
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false, default: null },
  salePrice: { type: Number, required: false, default: null },
  description: { type: String, required: false },
  variable: { type: Boolean, required: false, default: false },
  imgURL: { type: String, required: false },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    id: { type: Schema.Types.ObjectId, required: false },
    name: { type: String, required: false },
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
  active: { type: Boolean, default: true, required: true },
  variations: [variationSchema],
  addonCategory: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "AddonCategory",
      requered: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  addons: [{ type: Schema.Types.ObjectId, required: false }],
});

export default mongoose.model<IProduct>("Product", productSchema);
