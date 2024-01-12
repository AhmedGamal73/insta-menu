import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  products: string[];
}

const categorySchema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model<ICategory>("Category", categorySchema);
