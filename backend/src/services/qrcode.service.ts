import {qrCodeSchema} from "../models/qrCode.model";
import * as QRCode from "qrcode";
import {tableSchema} from "../models/table.model";
import jwt from "jsonwebtoken";
import { connectModel } from "../controllers/table.controller";

// Generating New QRcode
export async function generateQrCode(tableId: string) {
  // Validate inputs
  if (!tableId || typeof tableId !== "string" || tableId.toString() === "") {
    throw new Error("Invalid Data:tableId must be string and not empty");
  }

  try {
    // Find table
    const Table = await connectModel("Table", tableSchema);
    const table = await Table.findById(tableId);
    if (!table) {
      throw new Error(`table: ${table} not found`);
    }

    // Find QRcode
    const Qrcode = await connectModel("Qrcode", qrCodeSchema);
    const qrcode = await Qrcode.findOne({ tableId });
    if (!qrcode) {
      await Qrcode.create({ tableId });
    }

    // Generate encrypted data
    const TOKEN_KEY = process.env.TOKEN_KEY;
    if (!TOKEN_KEY) {
      throw new Error("TOKEN_KEY is not set");
    }
    const encryptedData = jwt.sign(
      {
        tableId: table?._id,
        tableNo: table?.tableNo,
      },
      TOKEN_KEY
    );

    // Generate the QRcode
    const dataImage = await QRCode.toDataURL(encryptedData);

    return dataImage;
  } catch (err) {
    console.log(err);
  }
}
