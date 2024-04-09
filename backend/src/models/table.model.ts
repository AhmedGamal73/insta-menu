import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITable extends Document {
  tableNo: string;
  tableStatus: boolean;
  chairsNo: string;
  sectionId?: string;
  qrCode?: string;
}

const tableSchema = new Schema({
  tableNo: { type: Number, required: false },
  tableStatus: { type: Boolean, required: false, default: true },
  chairsNo: { type: Number, required: false },
  sectionId: {
    type: Types.ObjectId,
    ref: "Section",
    required: false,
  },
  qrCode: { type: String, required: false },
});

export default mongoose.model<ITable>("Table", tableSchema);
