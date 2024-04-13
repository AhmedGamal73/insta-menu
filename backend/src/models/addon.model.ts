import mongoose, { Document, Schema } from "mongoose";

export interface IAddon extends Document {
  name: string;
  price: number;
  categoryId: string;
}

export interface ICategory extends Document {
  name: string;
  total: number;
}

const addonCategorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true, default: 0 },
});

const addonSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  clickId: { type: String, required: false },
  addonCategory: { type: Schema.Types.ObjectId, ref: "AddonCategory" },
});

const Addon = mongoose.model<IAddon>("Addon", addonSchema);
const AddonCategory = mongoose.model<ICategory>(
  "AddonCategory",
  addonCategorySchema
);

export { Addon, AddonCategory };
