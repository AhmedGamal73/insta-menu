"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addon_controller_1 = require("../controllers/addon.controller");
const addonRouter = express_1.default.Router();
// POST
addonRouter.post("/addoncategory", addon_controller_1.postAddonCategoryController); // Addon Category
addonRouter.post("/", addon_controller_1.postAddonController); // Addon
// GET
addonRouter.get("/addoncategory", addon_controller_1.getAddonCategoryController); // Addon Categories
addonRouter.get("/:addonCategoryId", addon_controller_1.getAddonsByCategoryController); // Addons By Category
addonRouter.get("/", addon_controller_1.getAddonsController); // Addons
addonRouter.get("/product/:productId", addon_controller_1.getProductAddonsController); // Addon names
// Delete
addonRouter.delete("/:id", addon_controller_1.deleteAddonController); // Addon
// PUT
addonRouter.put("/addoncategory/:id", addon_controller_1.putAddonCategoryController); // Addon Category
exports.default = addonRouter;
//# sourceMappingURL=addon.route.js.map