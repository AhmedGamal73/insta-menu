import mongoose, { Schema, Document } from "mongoose";

interface ICity extends Document {
  name: string;
}

interface IDistrict extends Document {
  name: string;
  price: number;
  cityId: Schema.Types.ObjectId;
  time: number;
}

interface IAddress extends Document {
  cityId: Schema.Types.ObjectId;
  districtId: Schema.Types.ObjectId;
  street: string;
}

export const citySchema = new Schema({
  name: { type: String, required: true },
});

export const districtSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  time: { type: Number, required: false },
});

export const locationSchecma = new Schema({
  cityId: { type: Schema.ObjectId, ref: "City", required: true },
  districtId: { type: Schema.Types.ObjectId, ref: "District" },
  street: { type: String, required: true },
});

const City = mongoose.model<ICity>("City", citySchema);
const District = mongoose.model<IDistrict>("District", districtSchema);
const Address = mongoose.model<IAddress>("Address", locationSchecma);

export { City, District, Address };
