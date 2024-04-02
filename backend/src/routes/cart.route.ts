import express from "express";

import {
  getCartController,
  getCartItemsController,
} from "../controllers/cart.controller";

const cartRouter = express.Router();

// Cart
cartRouter.get("/:id", getCartController);
// Cart Items
cartRouter.get("/", getCartItemsController);

export default cartRouter;
