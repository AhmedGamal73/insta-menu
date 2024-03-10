import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: Schema.ObjectId, ref: "Role", required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
