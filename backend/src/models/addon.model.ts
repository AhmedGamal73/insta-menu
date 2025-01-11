import mongoose, { Document, Schema } from "mongoose";

export interface IAddon extends Document {
  name: string;
  price: number;
  clickId: string;
  categoryId: string;
}

export interface ICategory extends Document {
  name: string;
  total: number;
}

export const addonCategorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true, default: 0 },
});

export const addonSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  clickId: { type: String, required: true },
  addonCategory: { type: Schema.Types.ObjectId, ref: "AddonCategory" },
});

const Addon = mongoose.model<IAddon>("Addon", addonSchema);
const AddonCategory = mongoose.model<ICategory>(
  "AddonCategory",
  addonCategorySchema
);

export { Addon, AddonCategory };
