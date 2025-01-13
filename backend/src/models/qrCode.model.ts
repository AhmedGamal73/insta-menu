import mongoose, { Document, Schema, Types } from "mongoose";

export interface IQRCode extends mongoose.Document {
  tableId: Types.ObjectId;
  lastUpdated: Date;
  isActive: boolean;
  disabled: boolean;
}

export const qrCodeSchema: Schema<IQRCode> = new Schema({
  tableId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  lastUpdated: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

export default mongoose.model("Qrcode", qrCodeSchema);
