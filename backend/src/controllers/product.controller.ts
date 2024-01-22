import { Request, Response } from "express";
import { getProducts, postProducts } from "../services/product.service";

// Create a product
export async function postProductController(req: Request, res: Response) {
  try {
    const { sizes, variable, imgURL, name, categoryName, ...productData } =
      req.body;

    const product = await postProducts({
      name,
      categoryName,
      sizes,
      variable,
      ...productData,
    });

    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// Get all products
export async function getProductsController(req: Request, res: Response) {
  try {
    const products = await getProducts();
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}
