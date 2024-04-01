import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  _id?: string;
  name: string;
  total: number;
  subcategories: ISubCategory[];
  restaurantId?: string;
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
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model<ICategory>("Category", categorySchema);
