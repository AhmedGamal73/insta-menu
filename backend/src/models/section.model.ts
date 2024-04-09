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
  name: { type: String, required: true },
  waiters: [{ type: Schema.Types.ObjectId, ref: "Waiter" }],
  tables: [{ type: Schema.Types.ObjectId, ref: "Table" }],
});

export default mongoose.model<ISection>("Section", sectionSchema);
