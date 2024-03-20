import { Router } from "express";
import {
  postOrderController,
  getOrdersController,
  verifyOtpController,
  generateOtpController,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/", postOrderController);
orderRouter.get("/", getOrdersController);
orderRouter.post("/verify-otp", verifyOtpController);
orderRouter.post("/generate-otp", generateOtpController);

export default orderRouter;
