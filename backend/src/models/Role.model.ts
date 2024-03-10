import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
}

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["ADMIN", "WAITER", "CASHIER", "GUEST"],
    default: "ADMIN",
  },
});

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
