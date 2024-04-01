"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addon_controller_1 = require("../controllers/addon.controller");
const addonRouter = (0, express_1.Router)();
// Create new addon
addonRouter.post("/", addon_controller_1.postAddonController);
// Get all addons
addonRouter.get("/", addon_controller_1.getAddonsController);
// Delete addon
addonRouter.delete("/:id", addon_controller_1.deleteAddonController);
// GET Addons by category
addonRouter.get("/:categoryId", addon_controller_1.getAddonsByCategoryController);
// GET Addons names
addonRouter.get("/product/:productId", addon_controller_1.getProductAddonsController);
exports.default = addonRouter;
//# sourceMappingURL=addon.route.js.map