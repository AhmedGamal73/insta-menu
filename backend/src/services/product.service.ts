import Product, { IProduct } from "../models/product.model";
import Category from "../models/category.model";
import fs from "fs";

interface PostProductsParams {
  name: string;
  categoryId: string;
  subcategoryId: string;
  variations: any[];
  variable: boolean;
  imgURL: string;
}

// Create a product
export async function postProducts({
  name,
  categoryId,
  subcategoryId,
  variations = [],
  variable = false,
  imgURL,
  ...productData
}: PostProductsParams): Promise<IProduct> {
  // Validate if product exist in our database
  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Product Already Exist");
  }

  // Find category
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category Not Exist");
  }

  if (subcategoryId === undefined) {
    subcategoryId = "";
  }
  const subcategory = category.subcategories.find(
    (sub) => sub._id?.toString() === subcategoryId.toString()
  );
  if (!subcategory) {
    console.log("Subcategory ID:", subcategoryId);
    console.log("Subcategories:", category.subcategories);
    throw new Error("Subcategory Not Exist");
  }

  // Validate if product is variable
  if (variations.length > 0 && variable === false) {
    throw new Error("Product is not variable");
  }

  // Create product image
  const newProduct = new Product({
    ...productData,
    variable: false,
    category: {
      _id: category._id,
      name: category.name,
    },
    subcategory: {
      id: subcategory._id,
      name: subcategory.name,
    },
    name,
  });
  await newProduct.save();

  // Populate product with category
  // const populatedProduct = await Product.findById(newProduct._id).populate(
  //   "category",
  //   "_id name"
  // );

  // if (!populatedProduct) {
  //   throw new Error("Product not found");
  // }

  // Increment category total
  ++category.total;
  await category.save();

  return newProduct;
}

// Get all products
export async function getProducts() {
  const products = await Product.find().populate("category", "name _id");
  return products;
}
