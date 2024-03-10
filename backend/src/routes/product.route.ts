import express from "express";
import multer from "multer";

import {
  postProductController,
  deleteProductController,
  getActiveProductsController,
  getInactiveProductsController,
  getProductByIdController,
  getProductsController,
  updateProductController,
  updateToActiveController,
} from "../controllers/product.controller";

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productRouter = express.Router();

// POST Product
productRouter.post("/", upload.single("img"), postProductController);

// GET Products
productRouter.get("/", getProductsController);

// Get Active Products
productRouter.get("/active", getActiveProductsController);

// Get Inactive Products
productRouter.get("/inactive", getInactiveProductsController);

// Get product by id
productRouter.get("/:id", getProductByIdController);

// Delete product
productRouter.delete("/:id", deleteProductController);

// Update prduct
productRouter.put("/:productId", updateProductController);

// Update product active status
productRouter.patch("/:id", updateToActiveController);

export default productRouter;
