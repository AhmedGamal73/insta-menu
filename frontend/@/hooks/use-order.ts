import axios from "axios";
import { Cart } from "./use-cart";
import { Location } from "./use-location";

const orderAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONGODB_URI,
});

export type Order = {
  _id?: string;
  customerToken: string;
  orderName: string;
  tableNo: number;
  phoneNumber: string;
  location: Location;
  orderType?: string;
  quantity: number;
  cart: Cart[];
  subtotal?: number;
  total?: number;
  discount?: number;
  vat?: number;
  paymentMethod?: string;
  deliveryFee?: number;
  deliveryTime?: number;
  loungeTax?: number;
  promoCode?: number;
};

// POST Order
export const postOrder = async (order: Order) => {
  return await orderAPI.post("/order", order);
};

// Verify OTP
export const verifyOtp = async (data: object) => {
  return await orderAPI.post("/order/verify-otp", data);
};

// Generate OTP
export const generateOtp = async () => {
  return await orderAPI.post("/order/generate-otp");
};
