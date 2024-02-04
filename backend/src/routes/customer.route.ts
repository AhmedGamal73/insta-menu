import express, { Request, Response } from "express";

import { postCustomer, getCustomers } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.post("/", postCustomer);
customerRouter.get("/", getCustomers);

export default customerRouter;
