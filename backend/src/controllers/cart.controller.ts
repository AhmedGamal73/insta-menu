import express, { Request, Response } from "express";

import Cart from "../models/cart.model";

export async function getCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ error: "An error occurred" });
    console.log(err);
  }
}
