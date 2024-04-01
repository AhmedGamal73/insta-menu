import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
  phone: string;
  address: string;
  sections?: Types.ObjectId[];
  waiterOrders?: Types.ObjectId[];
  shiftType: string;
  shiftStart: Date;
  shiftEnd: Date;
  createdAt: Date;
  sectionId: {
    id: string;
    name: string;
  };
  tables: {
    id: string;
    number: number;
  }[];
  role: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  role: {
    type: String,
    enum: ["admin", "cashier", "waiter"],
    default: "waiter",
    required: true,
  },
  sectionId: {
    id: { type: String },
    name: { type: String },
  },
  tables: [
    {
      _id: false,
      id: { type: String },
      number: { type: Number },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],

  shiftType: {
    type: String,
    enum: ["Morning", "Evening", "Double"],
    default: "Morning",
  },
  shiftStart: { type: Date, default: null },
  shiftEnd: { type: Date, default: null },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
