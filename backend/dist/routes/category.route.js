"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_model_1 = __importDefault(require("../models/category.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const categoryRouter = express_1.default.Router();
// Create a category
categoryRouter.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send("All input is required");
        }
        const categoryExist = await category_model_1.default.findOne({ name });
        if (categoryExist) {
            return res.status(400).send("Category Already Exist");
        }
        const newCategory = new category_model_1.default({ name });
        await newCategory.save();
        return res.status(201).json({ category: newCategory });
    }
    catch (err) {
        console.log(err);
    }
});
// Get all categories
categoryRouter.get("/", async (req, res) => {
    try {
        const categories = await category_model_1.default.find();
        res.json(categories);
    }
    catch (err) {
        console.log(err);
    }
});
// GET Products by category name
categoryRouter.get("/:categoryName/products", async (req, res) => {
    try {
        const { categoryName } = req.params;
        const category = await category_model_1.default.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        const activeProducts = await product_model_1.default.find({
            active: true,
            category: category._id,
        });
        res.json(activeProducts);
    }
    catch (err) {
        console.log(err);
    }
});
// Update category
categoryRouter.put("/:categoryName", async (req, res) => {
    const { categoryName } = req.params;
    const update = req.body;
    try {
        const category = await category_model_1.default.findOneAndUpdate({ name: categoryName }, update, {
            new: true,
        });
        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        category.save();
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
// GET Subcategories
categoryRouter.get("/:categoryId/sub", async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await category_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        res.json(category.subcategories);
    }
    catch (err) {
        res.status(500).json({ message: "server Error" });
    }
});
// Add subcategory
categoryRouter.post("/:categoryId/subcategories", async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        const category = await category_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (category.subcategories.find((sub) => sub.name === name)) {
            return res.status(400).json({ message: "Subcategory already exist" });
        }
        category.subcategories.push({ name, total: 0 });
        category.total++;
        category.save();
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ message: "server Error" });
    }
});
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map