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
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

const addonRouter = express.Router();

// POST
addonRouter.post("/addoncategory", isAuthenticated, authorizeTenant,postAddonCategoryController); // Addon Category
addonRouter.post("/", isAuthenticated, authorizeTenant,postAddonController); // Addon

// GET
addonRouter.get("/addoncategory", getAddonCategoryController); // Addon Categories
addonRouter.get("/:addonCategoryId", getAddonsByCategoryController); // Addons By Category
addonRouter.get("/", getAddonsController); // Addons
addonRouter.get("/product/:productId", getProductAddonsController); // Addon names

// Delete
addonRouter.delete("/:id", isAuthenticated, authorizeTenant,deleteAddonController); // Addon

// PUT
addonRouter.put("/addoncategory/:id", isAuthenticated, authorizeTenant,putAddonCategoryController); // Addon Category

export default addonRouter;
