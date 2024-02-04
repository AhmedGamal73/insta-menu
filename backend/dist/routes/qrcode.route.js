"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Generate QR code for table
const express_1 = __importDefault(require("express"));
const qrcode_controller_1 = require("../controllers/qrcode.controller");
const qrRouter = express_1.default.Router();
// Post QRcode Endpoint
qrRouter.post("/create", qrcode_controller_1.postQrcode);
// Scan QRcode Endpoint
qrRouter.post("/scan", qrcode_controller_1.postScanQrcode);
exports.default = qrRouter;
//# sourceMappingURL=qrcode.route.js.map