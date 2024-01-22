import mongoose, { Schema, Document, Types } from "mongoose";

interface IFloor extends Document {
  floorNo: Number;
  sections: Types.ObjectId[];
}

const floorSchema = new Schema({
  floorNo: { type: String, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
});

export default mongoose.model<IFloor>("Floor", floorSchema);
