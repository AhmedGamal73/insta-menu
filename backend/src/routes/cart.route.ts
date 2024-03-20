import express from "express";

import { getCartController } from "../controllers/cart.controller";
const cartRouter = express.Router();

cartRouter.get("/:id", getCartController);

export default cartRouter;
