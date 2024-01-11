import mongoose, { Schema, Document } from "mongoose";

interface ICartItem extends Document {
  product: Schema.Types.ObjectId;
  quantity: Number;
}

interface ICart extends Document {
  user: String;
  items: ICartItem[];
  quantity: Number;
}

const cartSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  quantity: { type: Number, default: 1 },
});

export default mongoose.model<ICart>("CartItem", cartSchema);
