import { Request, Response } from "express";
import { Addon, AddonCategory } from "../models/addon.model";
import Product from "../models/product.model";

// POST addon
export async function postAddonController(req: Request, res: Response) {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ message: "All input is required" });
  }

  const addonExist = await Addon.findOne({ name });
  if (addonExist) {
    return res.status(400).json({ message: "Addon already exists" });
  }

  const newAddon = new Addon({ name, price, categoryId });
  await newAddon.save();

  return res.status(201).json({ addon: newAddon });
}

// GET addons
export async function getAddonsController(req: Request, res: Response) {
  try {
    const addons = await Addon.find();
    return res.json(addons);
  } catch (error) {
    return res.status(500);
  }
}

// DELETE addon
export async function deleteAddonController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const addon = await Addon.findById(id);
    if (!addon) {
      return res.status(404).json({ message: "Addon not found" });
    }
    await addon.deleteOne();
    return res.json({ message: "Addon deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET addons by category
export async function getAddonsByCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { categoryId } = req.params;
    const addons = await Addon.find({ categoryId });
    return res.json(addons);
  } catch (error) {
    return res.status(500);
  }
}

// GET Product addons
export async function getProductAddonsController(req: Request, res: Response) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const addonArray = product.addons;
    let productAddons = [];
    if (addonArray) {
      for (let i = 0; i < addonArray.length; i++) {
        const addon = await Addon.findById(addonArray[i]);
        if (addon) {
          productAddons.push(addon);
        }
      }
    }

    return res.status(200).send(productAddons);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}
