import express, { Request, Response } from "express";

import Category from "../models/category.model";
import Product from "../models/product.model";

const categoryRouter = express.Router();

// Create a category
categoryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("All input is required");
    }

    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).send("Category Already Exist");
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    return res.status(201).json({ category: newCategory });
  } catch (err) {
    console.log(err);
  }
});

// Get all categories
categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.get(
  "/:categoryName/products",
  async (req: Request, res: Response) => {
    try {
      const { categoryName } = req.params;
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ message: "Category Not Found" });
      }
      const products = await Product.find({ category: category._id });
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  }
);

// Update category
categoryRouter.put("/:categoryName", async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  const update = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { name: categoryName },
      update,
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET Subcategories
categoryRouter.get(
  "/:categoryId/subcategories",
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category Not Found" });
      }
      res.json(category.subcategories);
    } catch (err) {
      res.status(500).json({ message: "server Error" });
    }
  }
);

// Add subcategory
categoryRouter.post(
  "/:categoryId/subcategories",
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category Not Found" });
      }

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      if (category.subcategories.find((sub) => sub.name === name)) {
        return res.status(400).json({ message: "Subcategory already exist" });
      }
      category.subcategories.push({ name, total: 0 });
      category.total++;
      category.save();
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: "server Error" });
    }
  }
);

export default categoryRouter;
