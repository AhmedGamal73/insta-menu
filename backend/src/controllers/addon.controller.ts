import { Request, Response } from "express";
import Addon from "../models/addon.model";

export async function postAddonController(req: Request, res: Response) {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "All input is required" });
  }

  const addonExist = await Addon.findOne({ name });
  if (addonExist) {
    return res.status(400).json({ message: "Addon already exists" });
  }

  const newAddon = new Addon({ name, price });
  await newAddon.save();

  return res.status(201).json({ addon: newAddon });
}

export async function getAddonsController(req: Request, res: Response) {
  try {
    const addons = await Addon.find();
    return res.json(addons);
  } catch (error) {
    return res.status(500);
  }
}
