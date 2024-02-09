import mongoose, { Document } from "mongoose";

interface IImg extends Document {
  imgName: string;
}

const imgSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, default: Date.now
  }
});

export default mongoose.model<IImg>("Img", imgSchema);
