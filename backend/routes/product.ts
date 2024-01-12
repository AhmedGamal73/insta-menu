import express, { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";

// Dynamic route for product
const productRouter = express.Router();

export default productRouter;

// Create a product
productRouter.post("/product", async (req: Request, res: Response) => {
  try {
    const { name, categoryName, ...productData } = req.body;

    // Find category
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).send("Category Not Exist");
    }

    // Validate if product exist in our database
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).send("Product Already Exist");
    }

    const newProduct = new Product({
      ...productData,
      category: category._id,
      name,
    });
    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id).populate(
      "category",
      "name _id"
    );

    return res.status(201).json(populatedProduct);
  } catch (err) {
    console.log(err);
  }
});

// Get all products
productRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get product by id
productRouter.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name _id"
    );
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});
