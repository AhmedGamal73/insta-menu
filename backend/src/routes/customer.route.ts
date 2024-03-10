import express, { Request, Response } from "express";

import {
  postCustomerSignup,
  postCustomerLogin,
  getCustomers,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);

customerRouter.post("/signup", postCustomerSignup);

customerRouter.post("/login", postCustomerLogin);

export default customerRouter;
