import mongoose, { Schema, Document } from "mongoose";

export interface Iingredients extends Document {
  name: string;
}

const ingredientSchema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<Iingredients>("Ingredient", ingredientSchema);
