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
// POST Product
productRouter.post("/", upload.single("img"), product_controller_1.postProductController);
// GET Products
productRouter.get("/", product_controller_1.getProductsController);
// Get Active Products
productRouter.get("/active", product_controller_1.getActiveProductsController);
// Get Inactive Products
productRouter.get("/inactive", product_controller_1.getInactiveProductsController);
// Get product by id
productRouter.get("/:id", product_controller_1.getProductByIdController);
// Delete product
productRouter.delete("/:id", product_controller_1.deleteProductController);
// Update prduct
productRouter.put("/:productId", product_controller_1.updateProductController);
// Update product active status
productRouter.patch("/:id", product_controller_1.updateToActiveController);
exports.default = productRouter;
//# sourceMappingURL=product.route.js.map