import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    token?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name : { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
})


export default mongoose.model<IUser>('User', userSchema);