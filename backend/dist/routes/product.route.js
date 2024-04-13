"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const product_controller_1 = require("../controllers/product.controller");
// Multer
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const productRouter = express_1.default.Router();
// POST
productRouter.post("/", upload.single("img"), product_controller_1.postProductController); // Product
// GET
productRouter.get("/", product_controller_1.getProductsController); // Products
productRouter.get("/offers", product_controller_1.getOfferProductsController); // Offer Products
productRouter.get("/active", product_controller_1.getActiveProductsController); // Active Products
productRouter.get("/inactive", product_controller_1.getInactiveProductsController); // Inactive Products
productRouter.get("/:id", product_controller_1.getProductByIdController); // Product by id
productRouter.get("/category/:categoryId/", product_controller_1.getProductsByCategoryIdController); // Products by category name
productRouter.get("/restaurant/:slug/category/:categoryId", product_controller_1.getProductsByCategoryIdAndRestaurantIdController); // Products by restaurant slug and category id
// Delete product
productRouter.delete("/:id", product_controller_1.deleteProductController);
// PUT
productRouter.put("/:productId", product_controller_1.updateProductController); // Product
productRouter.patch("/:id", product_controller_1.updateToActiveController); // Active product
exports.default = productRouter;
//# sourceMappingURL=product.route.js.map