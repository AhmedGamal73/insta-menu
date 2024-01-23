import Product, { IProduct } from "../models/product.model";
import Category from "../models/category.model";
import fs from "fs";

interface PostProductsParams {
  name: string;
  categoryName: string;
  sizes: any[]; // Replace with the actual type of the elements in the sizes array
  variable: boolean;
  imgURL: string;
}

// Create a product
export async function postProducts({
  name,
  categoryName,
  sizes,
  variable,
  imgURL,
  ...productData
}: PostProductsParams): Promise<IProduct> {
  // Validate if product exist in our database
  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Product Already Exist");
  }

  // Find category
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new Error("Category Not Exist");
  }

  // Validate if product is variable
  if (sizes.length > 0 && variable === false) {
    throw new Error("Product is not variable");
  }

  // Create product image
  const newProduct = new Product({
    ...productData,
    category: category._id,
    name,
    imgURL: {
      data: fs.readFileSync(imgURL),
    },
  });
  await newProduct.save();

  // Populate product with category
  const populatedProduct = await Product.findById(newProduct._id).populate(
    "category",
    "name _id"
  );

  if (!populatedProduct) {
    throw new Error("Product not found");
  }

  // Increment category total
  ++category.total;
  await category.save();

  return populatedProduct;
}

// Get all products
export async function getProducts() {
  const products = await Product.find().populate("category", "name _id");
  return products;
}
