import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Cart from "../models/cart.model";

export async function getCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate("items.addons");
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
