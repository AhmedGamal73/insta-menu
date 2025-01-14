import { Request, Response } from "express";
import axiox from "axios";

import { orderSchema } from "../models/order.model";
import { cartSchema } from "../models/cart.model";
import {
  validateAddress,
  validateCustomerToken,
} from "../services/order.service";
import mongoose from "mongoose";
import { Customer } from "../models/customer.model";
import { connectModel } from "./table.controller";

let order: any = {};

export async function postOrderController(req: Request, res: Response) {
  try {
    const customerToken: string = req.headers.authorization || "";
    const {
      address,
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

    if (!orderName || orderName == "") {
      return res.status(400).json("Order name is required");
    }
    if (!vat) {
      return res
        .status(400)
        .json({ success: false, message: "Vat is required" });
    }
    if (!loungeTax) {
      return res
        .status(400)
        .json({ success: false, message: "loungeTax is required" });
    }
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "phoneNumber is required" });
    }
    if (!discount) {
      return res
        .status(400)
        .json({ success: false, message: "discount is required" });
    }
    if (!total) {
      return res
        .status(400)
        .json({ success: false, message: "total is required" });
    }
    if (!subtotal) {
      return res
        .status(400)
        .json({ success: false, message: "subtotal is required" });
    }
    if (!orderType) {
      return res
        .status(400)
        .json({ success: false, message: "orderType is required" });
    }
    // verify customer token
    const customerId = await validateCustomerToken(customerToken);
    // verify address
    const addressId = await validateAddress(orderType, address);
    const Cart = await connectModel("Cart", cartSchema);
    const newCart = await await Cart.create({
      items: cart,
    });
    if(!req.customer) {return res.status(400).json({ message: "Customer token not found" });}

    order = {
      customerId: req.customer.id,
      orderName: orderName,
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
      cart: newCart,
      rating: 0,
      feedback: "",
      orderStatus: "Pending",
      slug: req.headers.tenant,
    };
    const Order = await connectModel("Order", orderSchema);
    const newOrder = await Order.create(order);

    return res.status(201).json(newOrder);
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

// Generate OTP
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

// Verify OTP
export async function verifyOtpController(req: Request, res: Response) {
  const { otp: customerOtp } = req.body;

  try {
    if (otp === customerOtp) {
      const Order = await connectModel("Order", orderSchema);
      const newOrder = await Order.create(order);
      await newOrder.save();

      const customer = await Customer.findById(newOrder.customerId);
      customer?.orders.push(newOrder._id);
      await customer?.save();
      return res.status(200).json({ newOrder, customer });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred" });
  }
}

// GET Orders
export async function getOrdersController(req: Request, res: Response) {
  try {
    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function getOrdersForUser(req: Request, res: Response) {
  try {
    if (!req.customer) {
      // Handle the case where req.customer is undefined
      return res.status(400).json({ message: "Customer not found" });
    }
    // Now you can safely use req.customer
    const customerId = req.customer._id;

    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    if(orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Orders - Dinner Mind -
export async function getClickOrdersController(req: Request, res: Response) {
  try {
    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find({ clickVirefiy: false })
      .sort({
        createdAt: -1,
      })
      .populate("cart")
      .populate({
        path: "cart",
        populate: {
          path: "items",
          populate: {
            path: "addons", // Assuming 'addons' is the field name
          },
        },
      });

    const modifiedOrders = orders.map((order: any) => {
      const { cart, ...otherProps } = order.toObject();
      return { ...otherProps, items: cart.items };
    });

    res.status(201).json(modifiedOrders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Order by ID
export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const Order = await connectModel("Order", orderSchema);
    const order = await Order.findById(id).populate("cart");
    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Delivery Orders
export async function getDeliveryOrdersController(req: Request, res: Response) {
  try {
    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find({ orderType: "Delivery" }).sort({
      createdAt: -1,
    });
    return res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Takeaway Orders
export async function getTakeawayOrdersController(req: Request, res: Response) {
  try {
    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find({ orderType: "Takeaway" }).sort({
      createdAt: -1,
    });
    return res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Indoor Orders
export async function getIndoorOrdersController(req: Request, res: Response) {
  try {
    const Order = await connectModel("Order", orderSchema);
    const orders = await Order.find({
      orderType: "Indoor",
      waiterApproval: true,
    }).sort({
      createdAt: -1,
    });
    return res.status(201).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// PUT Order Approved
export async function putOrderApprovedController(req: Request, res: Response) {
  // get the order id from the request parameters
  const orderId = req.params.id;
  try {
    const Order = await connectModel("Order", orderSchema);
    Order.findByIdAndUpdate(
      orderId,
      {
        waiterApproved: true, // set waiterApproved to true
      },
      (err: any, order: any) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(order);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// Delete Order
export async function deleteOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const Order = await connectModel("Order", orderSchema);
    await Order.findByIdAndDelete(id);
    return res.status(201).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// PUT Order
export async function putOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const Order = await connectModel("Order", orderSchema);
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(201).json(updatedOrder);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
