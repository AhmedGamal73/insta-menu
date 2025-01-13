import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import QR from "qrcode";

import Table from "../models/table.model";
import  { IQRCode, qrCodeSchema } from "../models/qrCode.model";
import ConnectedDevice from "../models/connectedDevice";
import { generateQrCode } from "../services/qrcode.service";
import { connectModel } from "./table.controller";

// Post Qrcode
export async function postQrcode(req: Request, res: Response) {
  try {
    const { tableId } = req.body;
    if(!tableId) return res.status(400).send("TableId is required");
    const dataImage = await generateQrCode(tableId).catch(err =>{
      return res.status(500).json({success:false, message: err.message});
    });
    return res.status(200).json({ dataImage });
  } catch (err: any) {
    console.log(`Error: ${err}`);
    return res.status(500).json({success:false, message: err.message});
  }
}

// Post scan qrcode
export async function postScanQrcode(req: Request, res: Response) {
  try {
    const { token, deviceInformation } = req.body;
    if (!(token && deviceInformation)) {
      res.status(400).send("Token and deviceInformation is required");
    }

    if (!process.env.TOKEN_SECRET_KEY) {
      return res.status(500).send("TOKEN_KEY is not set");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const qrCode = await connectModel("Qrcode", qrCodeSchema);
    const QRcode = await qrCode.findOne({
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
      devicemodels: deviceInformation.deviceModel,
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
    const authToken = jwt.sign({ table_id: table._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "2h",
    });

    // Create URL with tableId as query parameter
    const url = `http://localhost/menu?tableId=${table._id}`;
    const qrCodeData = await QR.toDataURL(url);
    // Return token
    return res
      .status(200)
      .json({ table_Number_is: table.tableNo, authToken, qrCodeData });
  } catch (err: any) {
    console.log(`Error: ${err}`);
  }
}
