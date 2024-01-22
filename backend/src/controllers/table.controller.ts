import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  postTable,
  getTables,
  loginTable,
  getSpecificTable,
} from "../services/table.service";
import Table, { ITable } from "../models/table.model";

export async function postTableController(req: Request, res: Response) {
  if (req.body === null) {
    return res.status(400).json({ error: "Request body cannot be null" });
  }
  try {
    const table = await postTable(req.body);

    // return new table
    return res.status(201).json({ table: table });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

// Get Tables Controller
export async function getTablesController(req: Request, res: Response) {
  try {
    const tables = await getTables();
    res.status(202).json(tables);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server error");
  }
}

// Login Table
export async function loginTableController(
  req: Request,
  res: Response
): Promise<string> {
  try {
    // Get table input
    const { tableNo }: ITable = req.body;
    const token = await loginTable(tableNo);
    res.status(200).json({ token });
    return token;
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
  return "";
}

// Get Specific Table
export async function getSpecificTableController(req: Request, res: Response) {
  try {
    const { tableNo } = req.body;
    const table = await getSpecificTable(tableNo);
    return res.status(202).json(table);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
}
