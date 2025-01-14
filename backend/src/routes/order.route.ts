import { authorizeTenant } from './../middleware/auth';
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
  getOrdersForUser,
} from "../controllers/order.controller";
import isAuthenticated from "../middleware/auth";

const orderRouter = Router();

orderRouter.post("/", isAuthenticated,postOrderController);
orderRouter.post("/verify-otp", verifyOtpController);
orderRouter.post("/generate-otp", generateOtpController);

orderRouter.get("/click", getClickOrdersController); // Integration with clicksolution CMS
orderRouter.get("/", isAuthenticated,authorizeTenant,getOrdersController);
orderRouter.get("/:id", getOrderByIdController);
orderRouter.get("/order-type/delivery", isAuthenticated, authorizeTenant,getDeliveryOrdersController);
orderRouter.get("/order-type/takeaway",isAuthenticated,authorizeTenant, getTakeawayOrdersController);
orderRouter.get("/order-type/indoor", isAuthenticated, authorizeTenant, getIndoorOrdersController);

//get orders for a users
orderRouter.get("/user/orders", isAuthenticated, getOrdersForUser);

orderRouter.delete("/:id", deleteOrderController);

orderRouter.put("/:id", putOrderController);
orderRouter.put("/waiter-approval/:id", putOrderApprovedController);

export default orderRouter;
