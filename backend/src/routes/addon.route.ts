import { Router } from "express";

import {
  postAddonController,
  getAddonsController,
} from "../controllers/addon.controller";

const addonRouter = Router();

// Get all addons
addonRouter.get("/", getAddonsController);

// Create new addon
addonRouter.post("/", postAddonController);

export default addonRouter;
