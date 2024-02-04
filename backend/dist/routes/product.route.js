"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const product_controller_1 = require("../controllers/product.controller");
// Dynamic route for product
const productRouter = express_1.default.Router();
// Create a product
productRouter.post("/", product_controller_1.postProductController);
// Get all products
productRouter.get("/", product_controller_1.getProductsController);
// Get Active Products
productRouter.get("/active", async (req, res) => {
    try {
        const products = await product_model_1.default.find({ active: true });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
// Get Inactive Products
productRouter.get("/inactive", async (req, res) => {
    try {
        const products = await product_model_1.default.find({ active: false });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
// Get product by id
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await product_model_1.default.findById(req.params.id).populate("category", "name _id");
        res.json(product);
    }
    catch (err) {
        console.log(err);
    }
});
// Delete product
productRouter.delete("/:id", async (req, res) => {
    try {
        const product = await product_model_1.default.findById(req.params.id);
        const category = await category_model_1.default.findById(product?.category);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await product_model_1.default.findByIdAndDelete(req.params.id);
        if (category) {
            --category.total; // Decrement category total
            await category.save();
        }
        res.status(204).json("Product deleted");
    }
    catch (err) {
        console.log(err);
    }
});
// Update prduct
productRouter.put("/:productId", async (req, res) => {
    try {
        const { sizes, variable, imgURL, name, categoryName, ...productData } = req.body;
        const oldProductId = req.params.productId;
        // Find old product exist
        const currentProduct = await product_model_1.default.findById(oldProductId);
        if (!currentProduct) {
            return res.status(404).send("Product not found");
        }
        if (currentProduct.variable === true && sizes.length === 0) {
            return res.status(400).send("Product is variable");
        }
        // Validate if product is variable
        if (sizes.length > 0 && variable === false) {
            return res.status(400).send("Product is not variable");
        }
        // Find old category
        const oldCategory = await category_model_1.default.findById(currentProduct?.category);
        if (!oldCategory) {
            return res.status(404).send("Category not found");
        }
        // Find category
        const category = await category_model_1.default.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).send("Category Entered Not Exist");
        }
        // Decrement category total
        if (categoryName !== oldCategory.name && oldCategory.total > 0) {
            --oldCategory.total;
        }
        // Create product image
        const img = "http://localhost:3001/content/demo.jfif";
        // Update product
        const updatedProduct = await product_model_1.default.findByIdAndUpdate(oldProductId, // The id of the product to update
        {
            ...productData,
            category: category._id,
            name,
            imgURL: img,
            sizes,
        }, {
            new: true, // Return the updated document
        });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        // Increment category total
        ++category.total;
        await category.save();
        return res.status(201).json(updatedProduct);
    }
    catch (err) {
        console.log(err);
    }
});
// Update product active status
productRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;
    try {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.active = active;
        await product.save();
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.default = productRouter;
//# sourceMappingURL=product.route.js.map