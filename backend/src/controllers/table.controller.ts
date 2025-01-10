import { Request, Response } from "express";
import * as QRCode from "qrcode";
const env = require("dotenv").config();

// import Section from "../models/section.model";
import { getTables, getSpecificTable } from "../services/table.service";
import {tableSchema} from "../models/table.model";
import { getConnection } from "../db/connectionManager";
import mongoose, { Schema } from "mongoose";
import { sectionSchema } from "../models/section.model";


export const connectModel = async (modelName: string, schema: Schema) => {
  // console.log("modelName:", modelName, "schema:", schema);
  try {
    const connection = await getConnection();
    const model = connection.model(modelName, schema);
    return model;
  } catch (error: Error | any) {
    throw new Error(error);
  }
};

// POST Table
export async function postTableController(req: Request, res: Response) {
  if (req.body === null) {
    return res.status(400).json({ error: "Request body cannot be null" });
  }
  try {
    // const table = await postTable(req.body);
    const Table = await connectModel("Table", tableSchema);
    const table = new Table(req.body);
    await table.save();

    const qrCode = await QRCode.toDataURL(
      `http://${process.env.MENU_URL}/menu?tableNo=${table.tableNo}`
    );

    table.qrCode = qrCode;
    await table.save();

    // return new table
    return res.status(201).json({ table: table });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// GET Tables
export async function getTablesController(req: Request, res: Response) {
  try {
    const tables = await getTables();
    return res.status(202).json(tables);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

// GET Table
export async function getTableController(req: Request, res: Response) {
  try {
    const { tableNo } = req.params ;
    const table = await getSpecificTable(parseInt(tableNo));
    return res.status(202).json(table);
  } catch (err : any | Error) {
    console.log(err);
    return res.status(500).json({error: err.message});
  }
}

// Delete Table
export async function deleteTableController(req: Request, res: Response) {
  try {
    const { tableNo } = req.params;
    const Table = await connectModel("Table", tableSchema);
    const table = await Table.findOneAndDelete({ tableNo: tableNo });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.json({ message: "Table deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

// PUT Table
export async function putTableController(req: Request, res: Response) {
  try {
    // Find the section by name
    const Section = await connectModel("Section", sectionSchema);
    const section = await Section.findOne({ name: req.body.section });

    const { section: _, ...rest } = req.body;
    const Table = await connectModel("Table", tableSchema);
    // Update the table
    const table = await Table.findOneAndUpdate(
      { tableNo: req.params.tableNo },
      { ...rest, section: section?._id },
      { new: true }
    ).populate("sectionId", "name -_id");

    // Update the section
    if (section) {
      section.tables?.push(table?._id);
      await section.save();
    }

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    return res.json(table);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
