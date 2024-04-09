import { Request, Response } from "express";

import { Cart } from "../models/cart.model";

// GET Cart Item
export async function getCartItemController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);

    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Cart Items
export async function getCartItemsController(req: Request, res: Response) {
  try {
    const items = await Cart.find().sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
