import mongoose, { Schema, Document, Types } from "mongoose";

interface IOrder extends Document {
  orderNo: string;
  customerId: Types.ObjectId;
  orderName: string;
  customerType: string;
  phoneNumber: string;
  cart: Types.ObjectId[];
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  addressId: string;
  deliveryFee: number;
  deliveryTime: string;
  rating: number;
  feedback: string;
  orderStatus: string;
  timestamp: string;
}

const orderSchema = new Schema({
  orderNo: { type: String, required: false },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  orderName: { type: String, required: true },
  orderType: {
    type: String,
    required: true,
    enum: ["Indoor", "Delivery", "Takeaway"],
  },
  cashier: { type: Schema.Types.ObjectId, ref: "Cashier", required: false },
  waiter: { type: Schema.Types.ObjectId, ref: "Waiter", required: false },
  phoneNumber: { type: String, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: "Cart", required: true }],
  quantity: { type: Number, required: false },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  discount: { type: Number, required: true },
  loungeTax: { type: Number, required: true },
  vat: { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ["Cash", "Card"] },
  addressId: { type: Schema.Types.ObjectId, ref: "Address", required: false },
  deliveryId: { type: Schema.Types.ObjectId, ref: "Delivery", required: false },
  deliveryFee: { type: Number, required: false },
  deliveryTime: { type: String, required: false },
  deliveryAddedFee: { type: Number, required: false },
  rating: { type: Number, required: false },
  feedback: { type: String, required: false },
  promoCode: { type: String, required: false },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  waiterApproval: { type: Boolean, default: false },
  // otp: { type: Number, required: false },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
  },
  timestamp: { type: String },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await this.model("Order").countDocuments({
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });
    this.orderNo = `${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${count + 1}`;
  }
  next();
});

export default mongoose.model<IOrder>("Order", orderSchema);
