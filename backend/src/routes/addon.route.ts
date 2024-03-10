import { Router } from "express";

import {
  postAddonController,
  getAddonsController,
  deleteAddonController,
  getProductAddonsController,
  getAddonsByCategoryController,
} from "../controllers/addon.controller";

const addonRouter = Router();

// Create new addon
addonRouter.post("/", postAddonController);

// Get all addons
addonRouter.get("/", getAddonsController);

// Delete addon
addonRouter.delete("/:id", deleteAddonController);

// GET Addons by category
addonRouter.get("/:categoryId", getAddonsByCategoryController);

// GET Addons names
addonRouter.get("/product/:productId", getProductAddonsController);

export default addonRouter;
