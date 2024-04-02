import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITable extends Document {
  tableNo: number;
  tableStatus: boolean;
  chairsNo: number;
  token?: string;
  sectionId?: string;
  qrCode?: string;
}

const tableSchema = new Schema({
  tableNo: { type: Number, required: true },
  tableStatus: { type: Boolean, required: false, default: true },
  chairsNo: { type: Number, required: true },
  sectionId: {
    type: Types.ObjectId,
    ref: "Section",
  },
  qrCode: { type: String },
});

export default mongoose.model<ITable>("Table", tableSchema);
