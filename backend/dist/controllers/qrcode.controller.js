"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postScanQrcode = exports.postQrcode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const qrcode_1 = __importDefault(require("qrcode"));
const table_model_1 = __importDefault(require("../models/table.model"));
const qrCode_model_1 = __importDefault(require("../models/qrCode.model"));
const connectedDevice_1 = __importDefault(require("../models/connectedDevice"));
const qrcode_service_1 = require("../services/qrcode.service");
// Post Qrcode
async function postQrcode(req, res) {
    try {
        const { tableId } = req.body;
        const dataImage = await (0, qrcode_service_1.generateQrCode)(tableId);
        res.status(200).json({ dataImage: dataImage });
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}
exports.postQrcode = postQrcode;
// Post scan qrcode
async function postScanQrcode(req, res) {
    try {
        const { token, deviceInformation } = req.body;
        if (!(token && deviceInformation)) {
            res.status(400).send("Token and deviceInformation is required");
        }
        if (!process.env.TOKEN_KEY) {
            return res.status(500).send("TOKEN_KEY is not set");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        const QRcode = await qrCode_model_1.default.findOne({
            tableId: decoded.tableId,
            disabled: false,
        });
        if (!QRcode) {
            return res.status(400).send("QR Code not found");
        }
        const connectedDeviceData = {
            tableId: decoded.tableId,
            qrCodeId: QRcode._id,
            deviceName: deviceInformation.deviceName,
            devicemodels: deviceInformation.deviceModel,
            deviceOS: deviceInformation.deviceOS,
            deviceVersion: deviceInformation.deviceVersion,
        };
        const connectedDevice = await connectedDevice_1.default.create(connectedDeviceData);
        // Update QRcode
        await qrCode_model_1.default.findOneAndUpdate({ _id: QRcode._id }, {
            isActive: true,
            connectedDeviceId: connectedDevice._id,
            lastUpdated: Date.now(),
        });
        // Find user
        const table = await table_model_1.default.findById(decoded.tableId);
        if (!table) {
            return res.status(404).send("Table not found");
        }
        // Create token
        const authToken = jsonwebtoken_1.default.sign({ table_id: table._id }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // Create URL with tableId as query parameter
        const url = `http://localhost/menu?tableId=${table._id}`;
        const qrCodeData = await qrcode_1.default.toDataURL(url);
        // Return token
        return res
            .status(200)
            .json({ table_Number_is: table.tableNo, authToken, qrCodeData });
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}
exports.postScanQrcode = postScanQrcode;
//# sourceMappingURL=qrcode.controller.js.map