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
  getClickOrdersController,
  deleteOrderController,
  putOrderApprovedController,
  putOrderController,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/", postOrderController);
orderRouter.post("/verify-otp", verifyOtpController);
orderRouter.post("/generate-otp", generateOtpController);

orderRouter.get("/click", getClickOrdersController); // Integration with clicksolution CMS
orderRouter.get("/", getOrdersController);
orderRouter.get("/:id", getOrderByIdController);
orderRouter.get("/order-type/delivery", getDeliveryOrdersController);
orderRouter.get("/order-type/takeaway", getTakeawayOrdersController);
orderRouter.get("/order-type/indoor", getIndoorOrdersController);

orderRouter.delete("/:id", deleteOrderController);

orderRouter.put("/:id", putOrderController);
orderRouter.put("/waiter-approval/:id", putOrderApprovedController);

export default orderRouter;
