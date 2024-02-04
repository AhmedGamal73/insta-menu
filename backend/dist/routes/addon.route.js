"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addon_controller_1 = require("../controllers/addon.controller");
const addonRouter = (0, express_1.Router)();
// Get all addons
addonRouter.get("/", addon_controller_1.getAddonsController);
// Create new addon
addonRouter.post("/", addon_controller_1.postAddonController);
exports.default = addonRouter;
//# sourceMappingURL=addon.route.js.map