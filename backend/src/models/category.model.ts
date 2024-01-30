import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  _id?: string;
  name: string;
  total: number;
  subcategories: ISubCategory[];
}

interface ISubCategory {
  _id?: string;
  name: string;
  total: number;
}

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, default: 0 },
});

const categorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, default: 0 },
  subcategories: [subCategorySchema],
});

export default mongoose.model<ICategory>("Category", categorySchema);
