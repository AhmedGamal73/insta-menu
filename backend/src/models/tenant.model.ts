import mongoose, { Schema, Document } from "mongoose";

export interface ITenant extends Document {
  businessName: string;
  email: string;
  phone: string;
  slug: string;
  password: string
}

export const tenantSchema = new Schema({
  businessName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

const Tenant = mongoose.model<ITenant>("Tenant", tenantSchema);

export default Tenant;
