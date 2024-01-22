// Generate QR code for table
import express from "express";
import { postQrcode, postScanQrcode } from "../controllers/qrcode.controller";

const qrRouter = express.Router();

// Post QRcode Endpoint
qrRouter.post("/create", postQrcode);

// Scan QRcode Endpoint
qrRouter.post("/scan", postScanQrcode);

export default qrRouter;
