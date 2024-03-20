import { Request, Response } from "express";
import axiox from "axios";

import Order from "../models/order.model";
import Cart from "../models/cart.model";
import {
  validateAddress,
  validateCustomerToken,
} from "../services/order.service";

let order: object,
  OTP: string = "111111";

const accountSid = "ACca410cb91999ee4c77bdf7beeeccfee5";
const authToken = "938a0c5f8ea0ee0f1510559f5654e764";
const verifySid = "VA3cbbea3d69bd97b01ee99f0532062316";
const client = require("twilio")(accountSid, authToken);

export async function postOrderController(req: Request, res: Response) {
  try {
    const {
      customerToken,
      location,
      cart,
      orderName,
      phoneNumber,
      subtotal,
      total,
      orderType,
      discount,
      vat,
      loungeTax,
      paymentMethod,
      dileveryFee,
      dileveryTime,
      promoCode,
    } = req.body;

    // verify customer token
    const customerId = await validateCustomerToken(customerToken);
    // verify address
    const addressId = await validateAddress(orderType, location);
    // create cart
    const newCart = await Cart.create({
      customerId,
      cart: cart,
    });
    await newCart.save();

    order = {
      customerId,
      orderName,
      orderType,
      phoneNumber,
      subtotal,
      total,
      discount,
      loungeTax,
      vat,
      paymentMethod,
      addressId,
      dileveryFee,
      dileveryTime,
      promoCode,
      cart: newCart._id,
      rating: 0,
      feedback: "",
      orderStatus: "Pending",
    };

    return res.status(201).json("Order created successfully");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "There was an error creating the order" });
  }
}

const otp = Math.floor(100000 + Math.random() * 900000).toString();
const WASAGE_DATA = {
  username: "7fb89c1496cc421dbd546ca5203de610fe6ac83e3bffd7d5e16653742359d6a3",
  password: "47ebb562f7031a211960d7b86d54fd70beb389d02c98efa552cac5dca8351da3",
  reference: "bfa424d349c2acf8f6eceb8fb1e6122e8a52ec0d7785e7c7992c12e65f5077fb",
  message: "رمز التحقق الخاص بك هو " + otp + " وقت انتهاء الصلاحية 5 دقائق",
};

export async function generateOtpController(req: Request, res: Response) {
  try {
    const wasageURI = "https://wasage.com/api/otp/?";
    const response = await axiox.post(wasageURI, WASAGE_DATA);
    const otpLink = response.data.Clickable;

    return res.status(200).json({ otpLink });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function verifyOtpController(req: Request, res: Response) {
  const { otp: customerOtp } = req.body;

  try {
    if (otp === customerOtp) {
      return res.status(200).json({ order });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "An error occurred" });
  }
}

// GET Orders
export async function getOrdersController(req: Request, res: Response) {
  try {
    const orders = await Order.find();
    return res.status(201).json(orders);
  } catch (err) {}
}

// GET Order by ID
export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return res.status(201).json(order);
  } catch (err) {}
}
