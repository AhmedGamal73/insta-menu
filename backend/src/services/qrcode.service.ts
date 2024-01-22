import Qrcode from "../models/qrCode.model";
import * as QRCode from "qrcode";
import Table from "../models/table.model";
import jwt from "jsonwebtoken";

// Generating New QRcode
export async function generateQrCode(tableId: string) {
  // Validate inputs
  if (!tableId || typeof tableId !== "string" || tableId.toString() === "") {
    throw new Error("Invalid Data: must be string and not empty");
  }

  try {
    // Find table
    const table = await Table.findById(tableId);
    if (!table) {
      throw new Error(`table: ${table} not found`);
    }

    // Find QRcode
    const qrcode = await Qrcode.findOne({ tableId });
    if (!qrcode) {
      await Qrcode.create({ tableId });
    } else {
      await Qrcode.findOneAndUpdate({ tableId }, { $set: { disabled: true } });
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
      TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Generate the QRcode
    const dataImage = await QRCode.toDataURL(encryptedData);

    return dataImage;
  } catch (err) {
    console.log(err);
  }
}
