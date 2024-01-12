import express, { Request, Response } from "express";
import Category from "../models/category";
import Product from "../models/product";

const categoryRouter = express.Router();

// Create a category
categoryRouter.post("/category", async (req: Request, res: Response) => {
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

categoryRouter.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().populate("products", "name _id");
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
});

categoryRouter.get(
  "/categories/:categoryName/products",
  async (req: Request, res: Response) => {
    try {
      const { categoryName } = req.params;
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ message: "Category Not Found" });
      }
      console.log(category._id);
      const products = await Product.find({ category: category._id });
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  }
);
export default categoryRouter;
