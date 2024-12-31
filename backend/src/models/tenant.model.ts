import mongoose, { Schema, Document } from "mongoose";

export interface ITenant extends Document {
  BusinessName: string;
  email: string;
  phone: string;
  slug: string;
}

const tenantSchema = new Schema({
  BusinessName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  slug: { type: String, required: true },
});

const Tenant = mongoose.model<ITenant>("Tenant", tenantSchema);

export default Tenant;
