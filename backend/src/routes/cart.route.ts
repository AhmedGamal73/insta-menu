import express from "express";

import { getCartController } from "../controllers/cart.controller";

const cartRouter = express.Router();

// Cart
cartRouter.get("/:id", getCartController);

export default cartRouter;
