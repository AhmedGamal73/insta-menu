import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISection extends Document {
  name: string;
  waiters?: Types.ObjectId[];
  tables?: Types.ObjectId[];
}

const sectionSchema = new Schema({
  name: { type: String, required: true },
  waiters: [{ type: Schema.Types.ObjectId, ref: "Waiter" }],
});

export default mongoose.model<ISection>("Section", sectionSchema);
