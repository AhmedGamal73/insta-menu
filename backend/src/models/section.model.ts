import mongoose, { Schema, Document, Types } from "mongoose";

interface Itable {
  id: Types.ObjectId;
  number: number;
}

export interface ISection extends Document {
  name: string;
  waiters: Types.ObjectId[];
  tables: Itable[];
}

const sectionSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ensure name is unique
  waiters: [{ type: Schema.Types.ObjectId, ref: "Waiter" }],
  tables: [{ type: Schema.Types.ObjectId, ref: "Table" }],
});

// Function to get the Section model for the current tenant
const getSectionModel = (): mongoose.Model<ISection> => {
  return mongoose.model<ISection>("Section", sectionSchema);
};

export { getSectionModel, sectionSchema };