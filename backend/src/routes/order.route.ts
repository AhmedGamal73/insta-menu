import { Router } from "express";
import {
  postOrderController,
  getOrdersController,
  verifyOtpController,
  generateOtpController,
  getDeliveryOrdersController,
  getTakeawayOrdersController,
  getIndoorOrdersController,
  getOrderByIdController,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/", postOrderController);
orderRouter.post("/verify-otp", verifyOtpController);
orderRouter.post("/generate-otp", generateOtpController);

orderRouter.get("/", getOrdersController);
orderRouter.get("/:id", getOrderByIdController);
orderRouter.get("/order-type/delivery", getDeliveryOrdersController);
orderRouter.get("/order-type/takeaway", getTakeawayOrdersController);
orderRouter.get("/order-type/indoor", getIndoorOrdersController);

export default orderRouter;
