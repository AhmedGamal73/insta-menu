"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const categoryRouter = express_1.default.Router();
// POST Category
categoryRouter.post("/", category_controller_1.upload.single("img"), category_controller_1.postCategoryController);
// Add subcategory
categoryRouter.post("/:categoryId/subcategories", category_controller_1.postSubcategoryController);
// Get Categories
categoryRouter.get("/", category_controller_1.getCategoriesController);
// GET Subcategories
categoryRouter.get("/:categoryId/sub", category_controller_1.getSubcategoriesController);
// Update Category
categoryRouter.put("/:categoryName", category_controller_1.putCategoryController);
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map