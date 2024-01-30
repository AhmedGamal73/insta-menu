import mongoose, { Document } from "mongoose";

interface IImg extends Document {
  imgName: string;
}

const imgSchema = new mongoose.Schema({
  imgName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IImg>("Img", imgSchema);
