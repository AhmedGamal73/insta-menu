import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  _id?: string;
  name: string;
  total: number;
  imgURL: string;
  subcategories: ISubCategory[];
}

export interface ISubCategory {
  _id?: string;
  name: string;
  total: number;
}

export const subCategorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, default: 0 },
});

export const categorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, default: 0 },
  imgURL: { type: String, required: true },
  subcategories: [subCategorySchema],
});

export default mongoose.model<ICategory>("Category", categorySchema);
