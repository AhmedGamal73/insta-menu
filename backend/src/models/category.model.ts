import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  total: number;
  subcategories: ISubCategory[];
}

interface ISubCategory {
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
