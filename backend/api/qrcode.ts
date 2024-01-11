// Generate QR code for table
import express, { Request, Response } from "express";
import Table from "../model/table";
import ConnectedDevice from "../model/connectedDevice";
import QR from "qrcode";
import qrCode, { IQRCode } from "../model/qrCode";
import jwt from "jsonwebtoken";

const qrRouter = express.Router();

qrRouter.post("/qr/create", async (req: Request, res: Response) => {
  try {
    const { tableId } = req.body;

    // Validate table id
    if (!tableId) {
      res.status(400).send("Table ID id is required");
    }

    // Get table from database
    const table = await Table.findById(tableId);

    // Validate if table exist in our database
    if (!table) {
      res.status(404).send("Table not found");
    }

    const qrExist = await qrCode.findOne({ tableId });

    // Create QR code if not exist
    if (!qrExist) {
      // Create QR code and save to database
      await qrCode.create({ tableId });
    } else {
      await qrCode.findOneAndUpdate({ tableId }, { $set: { disabled: true } });
      await qrCode.create({ tableId });
    }

    // Generate encrypted data
    const TOKEN_KEY = process.env.TOKEN_KEY;
    if (!TOKEN_KEY) {
      throw new Error("TOKEN_KEY is not set");
    }

    const encryptedData = jwt.sign(
      { tableId: table?._id, tableNo: table?.tableNo },
      TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Generate qr code
    const dataImage = await QR.toDataURL(encryptedData);

    // Return qr code
    return res.status(200).json({ dataImage });
  } catch (err: any) {
    console.log(`Error: ${err}`);
  }
});

// Scan QR code Endpoint
qrRouter.post("/qr/scan", async (req: Request, res: Response) => {
  try {
    const { token, deviceInformation } = req.body;
    if (!(token && deviceInformation)) {
      res.status(400).send("Token and deviceInformation is required");
    }

    if (!process.env.TOKEN_KEY) {
      return res.status(500).send("TOKEN_KEY is not set");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const QRcode = await qrCode.findOne<IQRCode>({
      tableId: (decoded as any).tableId,
      disabled: false,
    });

    if (!QRcode) {
      return res.status(400).send("QR Code not found");
    }

    const connectedDeviceData = {
      tableId: (decoded as any).tableId,
      qrCodeId: QRcode._id,
      deviceName: deviceInformation.deviceName,
      deviceModel: deviceInformation.deviceModel,
      deviceOS: deviceInformation.deviceOS,
      deviceVersion: deviceInformation.deviceVersion,
    };

    const connectedDevice = await ConnectedDevice.create(connectedDeviceData);

    // Update QRcode
    await qrCode.findOneAndUpdate(
      { _id: QRcode._id },
      {
        isActive: true,
        connectedDeviceId: connectedDevice._id,
        lastUpdated: Date.now(),
      }
    );

    // Find user
    const table = await Table.findById((decoded as any).tableId);

    if (!table) {
      return res.status(404).send("Table not found");
    }

    // Create token
    const authToken = jwt.sign({ table_id: table._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Return token
    return res.status(200).json({ table_Number_is: table.tableNo, authToken });
  } catch (err: any) {
    console.log(`Error: ${err}`);
  }
});

export default qrRouter;
