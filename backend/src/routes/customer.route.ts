import express from "express";

import {
  postCustomerSignup,
  postCustomerLogin,
  getCustomers,
  getCustomerController,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);

customerRouter.post("/signup", postCustomerSignup);

customerRouter.post("/login", postCustomerLogin);

customerRouter.get("/:customerId", getCustomerController);

export default customerRouter;
