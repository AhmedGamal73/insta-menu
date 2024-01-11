import mongoose, { Schema, Document } from "mongoose";

interface IConnectedDevice extends Document {
  tableId: Schema.Types.ObjectId;
  qrCodeId: Schema.Types.ObjectId;
  deviceName: string;
  deviceModel: string;
  deviceOS: string;
  deviceVersion: string;
  disabeld: boolean;
}

const connectedDeviceSchema: Schema<IConnectedDevice> = new Schema({
  tableId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  qrCodeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "qrCode",
  },
  deviceName: { type: String, default: null },
  deviceModel: { type: String, default: null },
  deviceOS: { type: String, default: null },
  deviceVersion: { type: String, default: null },
  disabeld: { type: Boolean, default: false },
});

export default mongoose.model<IConnectedDevice>(
  "connectedDevice",
  connectedDeviceSchema
);
