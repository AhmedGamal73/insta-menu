import express from "express";

import {
  getCategoriesController,
  getSubcategoriesController,
  postCategoryController,
  postSubcategoryController,
  putCategoryController,
  upload,
} from "../controllers/category.controller";
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

const categoryRouter = express.Router();

// POST Category
categoryRouter.post("/", isAuthenticated, authorizeTenant,upload.single("img"), postCategoryController);
// Add subcategory
categoryRouter.post("/:categoryId/subcategories", isAuthenticated, authorizeTenant, postSubcategoryController);

// Get Categories
categoryRouter.get("/", getCategoriesController);
// GET Subcategories
categoryRouter.get("/:categoryId/sub", getSubcategoriesController);

// Update Category
categoryRouter.put("/:categoryName", isAuthenticated, authorizeTenant, putCategoryController);

export default categoryRouter;
