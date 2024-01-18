import express, { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";

// Dynamic route for product
const productRouter = express.Router();

export default productRouter;

// Create a product
productRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { sizes, variable, imgURL, name, categoryName, ...productData } =
      req.body;

    // Validate if product exist in our database
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).send("Product Already Exist");
    }

    // Find category
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).send("Category Not Exist");
    }

    // Validate if product is variable
    if (sizes.length > 0 && variable === false) {
      return res.status(400).send("Product is not variable");
    }

    // Create product image
    const img = "http://localhost:3001/content/demo.jfif";

    const newProduct = new Product({
      ...productData,
      category: category._id,
      name,
      imgURL: img,
    });
    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id).populate(
      "category",
      "name _id"
    );

    ++category.total; // Increment category total
    await category.save();

    return res.status(201).json(populatedProduct);
  } catch (err) {
    console.log(err);
  }
});

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get product by id
productRouter.get("/:id", async (req, res) => {
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

// Delete product
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const category = await Category.findById(product?.category);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);

    if (category) {
      --category.total; // Decrement category total
      await category.save();
    }

    res.status(204).json("Product deleted");
  } catch (err) {
    console.log(err);
  }
});

// Update prduct
productRouter.put("/:productId", async (req: Request, res: Response) => {
  try {
    const { sizes, variable, imgURL, name, categoryName, ...productData } =
      req.body;
    const oldProductId = req.params.productId;

    // Find old product exist
    const currentProduct = await Product.findById(oldProductId);
    if (!currentProduct) {
      return res.status(404).send("Product not found");
    }

    if (currentProduct.variable === true && sizes.length === 0) {
      return res.status(400).send("Product is variable");
    }

    // Validate if product is variable
    if (sizes.length > 0 && variable === false) {
      return res.status(400).send("Product is not variable");
    }

    // Find old category
    const oldCategory = await Category.findById(currentProduct?.category);
    if (!oldCategory) {
      return res.status(404).send("Category not found");
    }

    // Find category
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).send("Category Entered Not Exist");
    }

    // Decrement category total
    if (categoryName !== oldCategory.name && oldCategory.total > 0) {
      --oldCategory.total;
    }

    // Create product image
    const img = "http://localhost:3001/content/demo.jfif";

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      oldProductId, // The id of the product to update
      {
        ...productData,
        category: category._id,
        name,
        imgURL: img,
        sizes,
      },
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    // Increment category total
    ++category.total;
    await category.save();

    return res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
  }
});
