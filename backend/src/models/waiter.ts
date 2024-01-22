import mongoose, { Schema, Document, Types } from "mongoose";

interface IWaiter extends Document {
  name: string;
  age: number;
  phone: string;
  address: string;
  sections?: Types.ObjectId[];
}

const waiterSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
});

const Waiter = mongoose.model<IWaiter>("Waiter", waiterSchema);

export default Waiter;
