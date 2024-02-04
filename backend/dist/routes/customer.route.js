"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const customerRouter = express_1.default.Router();
customerRouter.post("/", customer_controller_1.postCustomer);
customerRouter.get("/", customer_controller_1.getCustomers);
exports.default = customerRouter;
//# sourceMappingURL=customer.route.js.map