import mongoose, { Document, Schema } from "mongoose";

export interface IAddon extends Document {
  name: string;
  price: number;
}

const addonSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<IAddon>("Addon", addonSchema);
