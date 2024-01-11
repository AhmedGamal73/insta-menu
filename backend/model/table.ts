import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITable extends Document {
  tableNo: number;
  tableStatus: boolean;
  chairsNo: number;
  token?: string;
  section?: string;
}

const tableSchema = new Schema({
  tableNo: { type: Number, required: true },
  tableStatus: { type: Boolean, required: true },
  chairsNo: { type: Number, required: true },
  token: { type: String },
  section: {
    type: Types.ObjectId,
    ref: "Section",
  },
});

export default mongoose.model<ITable>("Table", tableSchema);
