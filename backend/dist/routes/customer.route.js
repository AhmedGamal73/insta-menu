"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const customerRouter = express_1.default.Router();
customerRouter.get("/", customer_controller_1.getCustomers);
customerRouter.post("/signup", customer_controller_1.postCustomerSignup);
customerRouter.post("/login", customer_controller_1.postCustomerLogin);
customerRouter.get("/:customerId", customer_controller_1.getCustomerController);
customerRouter.get("/:customerId/addfavorite/:productId", customer_controller_1.putCustomerFavoritesController); // Add product to favorites
customerRouter.put("/:customerId/deletefavorite/:productId", customer_controller_1.putCustomerRemoveFavoriteController); // Remove product to favorites
exports.default = customerRouter;
//# sourceMappingURL=customer.route.js.map