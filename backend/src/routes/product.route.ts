import express from "express";
import multer from "multer";

import {
  postProductController,
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
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productRouter = express.Router();

// POST
productRouter.post("/", isAuthenticated, authorizeTenant,upload.single("img"), postProductController); // Product

// GET
productRouter.get("/", getProductsController); // Products
productRouter.get("/offers", getOfferProductsController); // Offer Products
productRouter.get("/active", getActiveProductsController); // Active Products
productRouter.get("/inactive", getInactiveProductsController); // Inactive Products
productRouter.get("/one/:id", getProductByIdController); // Product by id
productRouter.get("/category/:categoryId/", getProductsByCategoryIdController); // Products by category name
productRouter.get(
  "/restaurant/:slug/category/:categoryId",
  getProductsByCategoryIdAndRestaurantIdController
); // Products by restaurant slug and category id

// Delete product
productRouter.delete("/:id", isAuthenticated, authorizeTenant,deleteProductController);

// PUT
productRouter.put("/:productId", isAuthenticated, authorizeTenant,updateProductController); // Product
productRouter.patch("/:id", isAuthenticated, authorizeTenant,updateToActiveController); // Active product

export default productRouter;
