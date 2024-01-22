import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  total: number;
}

const categorySchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, default: 0 },
});

export default mongoose.model<ICategory>("Category", categorySchema);
