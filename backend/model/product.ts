import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  productCategory: string;
}

const productSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productImage: { type: String, required: true },
  productCategory: { type: Schema.Types.ObjectId, ref: "Category" },
});

export default mongoose.model<IProduct>("Product", productSchema);
