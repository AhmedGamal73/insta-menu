"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
// Create a product
async function postProducts({ name, categoryId, subcategoryId, variations = [], variable = false, imgURL, ...productData }) {
    // Validate if product exist in our database
    const productExist = await product_model_1.default.findOne({ name });
    if (productExist) {
        throw new Error("Product Already Exist");
    }
    // Find category
    const category = await category_model_1.default.findById(categoryId);
    if (!category) {
        throw new Error("Category Not Exist");
    }
    if (subcategoryId === undefined) {
        subcategoryId = "";
    }
    const subcategory = category.subcategories.find((sub) => sub._id?.toString() === subcategoryId.toString());
    if (!subcategory) {
        throw new Error("Subcategory Not Exist");
    }
    // Validate if product is variable
    if (variations.length > 0 && variable === false) {
        throw new Error("Product is not variable");
    }
    // Create product image
    const newProduct = new product_model_1.default({
        ...productData,
        variable: false,
        category: {
            _id: category._id,
            name: category.name,
        },
        subcategory: {
            id: subcategory._id,
            name: subcategory.name,
        },
        name,
    });
    await newProduct.save();
    ++category.total;
    await category.save();
    return newProduct;
}
exports.postProducts = postProducts;
// Get all products
async function getProducts() {
    const products = await product_model_1.default.find().populate("category", "name _id");
    return products;
}
exports.getProducts = getProducts;
//# sourceMappingURL=product.service.js.map