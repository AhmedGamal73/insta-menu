import mongoose, { Schema, Document, Types } from "mongoose";

interface ISection extends Document {
  name: string;
  tables?: Types.ObjectId[];
}

const sectionSchema = new Schema({
  name: { type: String, required: true },
  tables: [{ type: Schema.Types.ObjectId, ref: "Table" }],
});

export default mongoose.model<ISection>("Section", sectionSchema);
