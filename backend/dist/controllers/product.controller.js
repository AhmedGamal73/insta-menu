"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = exports.postProductController = void 0;
const product_service_1 = require("../services/product.service");
// Create a product
async function postProductController(req, res) {
    try {
        const { sizes, variable, imgURL, name, categoryName, ...productData } = req.body;
        const product = await (0, product_service_1.postProducts)({
            name,
            categoryName,
            sizes,
            variable,
            ...productData,
        });
        return res.status(201).json(product);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.postProductController = postProductController;
// Get all products
async function getProductsController(req, res) {
    try {
        const products = await (0, product_service_1.getProducts)();
        return res.json(products);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}
exports.getProductsController = getProductsController;
//# sourceMappingURL=product.controller.js.map