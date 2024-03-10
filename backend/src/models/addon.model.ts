import mongoose, { Document, Schema } from "mongoose";

export interface IAddon extends Document {
  name: string;
  price: number;
  categoryId: string;
}

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true },
});

const addonSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Addon = mongoose.model<IAddon>("Addon", addonSchema);
const AddonCategory = mongoose.model<ICategory>(
  "AddonCategory",
  categorySchema
);

export { Addon, AddonCategory };
