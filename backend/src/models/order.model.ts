import mongoose, { Schema, Document, Types } from "mongoose";

interface IOrder extends Document {
  orderNo: string;
  customerId: Types.ObjectId;
  customerName: string;
  customerType: string;
  phoneNumber: string;
  cart: Types.ObjectId[];
  quantity: number;
  subtotal: number;
  discount: number;
  overallPrice: number;
  paymentMethod: string;
  deliveryAddress: string;
  deliveryFee: number;
  deliveryInstructions: string;
  deliveryTime: string;
  rating: number;
  feedback: string;
  orderStatus: string;
  timestamp: string;
}

const orderSchema = new Schema({
  orderNo: { type: String, required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  customerName: { type: String, required: true },
  customerType: {
    type: String,
    required: true,
    enum: ["Indoor", "Delivery", "Takeaway"],
  },
  phoneNumber: { type: String, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: "CartItem", required: true }],
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  overallPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ["Cash", "Card"] },
  deliveryAddress: { type: String, required: false },
  deliveryFee: { type: Number, required: false },
  deliveryTime: { type: String, required: false },
  deliveryInstructions: { type: String, required: false },
  rating: { type: Number, required: false },
  feedback: { type: String, required: false },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
  },
  timestamp: { type: String, required: true },
});

export default mongoose.model<IOrder>("Order", orderSchema);
