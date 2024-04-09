import express from "express";

import {
  getCategoriesController,
  getSubcategoriesController,
  postCategoryController,
  postSubcategoryController,
  putCategoryController,
  upload,
} from "../controllers/category.controller";

const categoryRouter = express.Router();

// POST Category
categoryRouter.post("/", upload.single("img"), postCategoryController);
// Add subcategory
categoryRouter.post("/:categoryId/subcategories", postSubcategoryController);

// Get Categories
categoryRouter.get("/", getCategoriesController);
// GET Subcategories
categoryRouter.get("/:categoryId/sub", getSubcategoriesController);

// Update Category
categoryRouter.put("/:categoryName", putCategoryController);

export default categoryRouter;
