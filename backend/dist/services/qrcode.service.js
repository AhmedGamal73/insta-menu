"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQrCode = void 0;
const qrCode_model_1 = __importDefault(require("../models/qrCode.model"));
const QRCode = __importStar(require("qrcode"));
const table_model_1 = __importDefault(require("../models/table.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generating New QRcode
async function generateQrCode(tableId) {
    // Validate inputs
    if (!tableId || typeof tableId !== "string" || tableId.toString() === "") {
        throw new Error("Invalid Data: must be string and not empty");
    }
    try {
        // Find table
        const table = await table_model_1.default.findById(tableId);
        if (!table) {
            throw new Error(`table: ${table} not found`);
        }
        // Find QRcode
        const qrcode = await qrCode_model_1.default.findOne({ tableId });
        if (!qrcode) {
            await qrCode_model_1.default.create({ tableId });
        }
        // Generate encrypted data
        const TOKEN_KEY = process.env.TOKEN_KEY;
        if (!TOKEN_KEY) {
            throw new Error("TOKEN_KEY is not set");
        }
        const encryptedData = jsonwebtoken_1.default.sign({
            tableId: table?._id,
            tableNo: table?.tableNo,
        }, TOKEN_KEY);
        // Generate the QRcode
        const dataImage = await QRCode.toDataURL(encryptedData);
        return dataImage;
    }
    catch (err) {
        console.log(err);
    }
}
exports.generateQrCode = generateQrCode;
//# sourceMappingURL=qrcode.service.js.map