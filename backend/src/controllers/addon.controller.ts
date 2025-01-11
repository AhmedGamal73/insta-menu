import { Request, Response } from "express";
import { addonSchema, addonCategorySchema } from "../models/addon.model";
import { productSchema } from "../models/product.model";
import { connectModel } from "./table.controller";

// POST addon
export async function postAddonController(req: Request, res: Response) {
  const { name, price, addonCategoryId } = req.body;

  if (!name || !price || !addonCategoryId) {
    return res.status(400).json({ message: "All input is required" });
  }
  const Addon = await connectModel("Addon", addonSchema);
  const addonExist = await Addon.findOne({ name });
  if (addonExist) {
    return res.status(400).json({ message: "Addon already exists" });
  }
  const AddonCategory = await connectModel(
    "AddonCategory",
    addonCategorySchema
  );
  const addonCategory = await AddonCategory.findById(addonCategoryId);
  if (!addonCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  if (!addonCategory.total) {
    addonCategory.total = 0;
  }
  addonCategory.total++;
  await addonCategory.save();

  const newAddon = new Addon({
    name,
    clickId: "123",
    price,
    addonCategory: addonCategoryId,
  });
  await newAddon.save();

  return res.status(201).json({ addon: newAddon });
}

// GET addons
export async function getAddonsController(req: Request, res: Response) {
  try {
    const Addon = await connectModel("Addon", addonSchema);
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
    const Addon = await connectModel("Addon", addonSchema);
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
    const { addonCategoryId } = req.params;
    const Addon = await connectModel("Addon", addonSchema);
    const addons = await Addon.find({ addonCategory: addonCategoryId });
    if(addons.length === 0) {return res.status(404).json({ message: "Addons in this category not found" });}
    return res.json(addons);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

// GET Product addons
export async function getProductAddonsController(req: Request, res: Response) {
  const { productId } = req.params;

  try {
    const Product = await connectModel("Product", productSchema);
    const Addon = await connectModel("Addon", addonSchema);
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
    if(!addonArray || productAddons.length === 0) {return res.status(404).json({ message: "Addons in this product not found" });}
    return res.status(200).send(productAddons);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET Addon By Id
export async function getAddonByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const Addon = await connectModel("Addon", addonSchema);
    const addon = await Addon.findById(id);
    if (!addon) {
      return res.status(404).json({ message: "Addon not found" });
    }
    return res.json(addon);
  } catch (error) {
    return res.status(500);
  }
}

// POST Addon Category
export async function postAddonCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name input is required" });
    const AddonCategory = await connectModel("AddonCategory", addonCategorySchema);
    const categoryExists = await AddonCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await AddonCategory.create({ name });
    res.status(201).json({ newCategory });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({success: false, message: err.message});
  }
}

// GET Addon Category
export async function getAddonCategoryController(req: Request, res: Response) {
  try {
    const AddonCategory = await connectModel(
      "AddonCategory",
      addonCategorySchema
    );
    const addonCategories = await AddonCategory.find();
    return res.json(addonCategories);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// PUT Addon Category
export async function putAddonCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const AddonCategory = await connectModel("AddonCategory", addonCategorySchema);
    const category = await AddonCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the name only if provided
    if (name) {
      category.name = name;
    }

    await category.save();
    return res.json(category);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
