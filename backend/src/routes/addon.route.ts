import express from "express";

import {
  postAddonController,
  getAddonsController,
  deleteAddonController,
  getProductAddonsController,
  getAddonsByCategoryController,
  postAddonCategoryController,
  getAddonCategoryController,
  putAddonCategoryController,
} from "../controllers/addon.controller";

const addonRouter = express.Router();

// POST
addonRouter.post("/addoncategory", postAddonCategoryController); // Addon Category
addonRouter.post("/", postAddonController); // Addon

// GET
addonRouter.get("/addoncategory", getAddonCategoryController); // Addon Categories
addonRouter.get("/:addonCategoryId", getAddonsByCategoryController); // Addons By Category
addonRouter.get("/", getAddonsController); // Addons
addonRouter.get("/product/:productId", getProductAddonsController); // Addon names

// Delete
addonRouter.delete("/:id", deleteAddonController); // Addon

// PUT
addonRouter.put("/addoncategory/:id", putAddonCategoryController); // Addon Category

export default addonRouter;
