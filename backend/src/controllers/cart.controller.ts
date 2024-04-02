import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Cart from "../models/cart.model";

export async function getCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id)
      .populate("items.addons")
      .populate("items.productId", "name imgURL");

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
