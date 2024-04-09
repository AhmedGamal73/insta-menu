import express from "express";

import {
  getCartItemController,
  getCartItemsController,
} from "../controllers/cart.controller";

const cartRouter = express.Router();

// Cart
cartRouter.get("/:id", getCartItemController);
// Cart Items
cartRouter.get("/", getCartItemsController);

export default cartRouter;
