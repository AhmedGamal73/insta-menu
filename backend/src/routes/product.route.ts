import express from "express";
import multer from "multer";

import {
  // postProductController,
  getActiveProductsController,
  getInactiveProductsController,
  getProductByIdController,
  getProductsController,
  getProductsByCategoryIdController,
  updateProductController,
  updateToActiveController,
  deleteProductController,
  getProductsByCategoryIdAndRestaurantIdController,
  getOfferProductsController,
} from "../controllers/product.controller";

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productRouter = express.Router();

// POST
// productRouter.post("/", upload.single("img"), postProductController); // Product

// GET
productRouter.get("/", getProductsController); // Products
productRouter.get("/offers", getOfferProductsController); // Offer Products
productRouter.get("/active", getActiveProductsController); // Active Products
productRouter.get("/inactive", getInactiveProductsController); // Inactive Products
productRouter.get("/:id", getProductByIdController); // Product by id
productRouter.get("/category/:categoryId/", getProductsByCategoryIdController); // Products by category name
productRouter.get(
  "/restaurant/:slug/category/:categoryId",
  getProductsByCategoryIdAndRestaurantIdController
); // Products by restaurant slug and category id

// Delete product
productRouter.delete("/:id", deleteProductController);

// PUT
productRouter.put("/:productId", updateProductController); // Product
productRouter.patch("/:id", updateToActiveController); // Active product

export default productRouter;
