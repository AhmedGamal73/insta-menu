import jwt from "jsonwebtoken";

import Table, { ITable } from "../models/table.model";
import Section from "../models/section.model";

interface postTableProps {
  tableNo: number;
  sectionId: string;
  [key: string]: any;
}

// Create Table
export async function postTable(params: postTableProps) {
  const { tableNo, sectionId } = params;
  // Inputs validation
  if (!tableNo || typeof tableNo !== "number") {
    throw new Error("Invalid Table Number");
  }
  if (!sectionId || typeof sectionId !== "string") {
    throw new Error("Invalid Section ID");
  }

  // Validate if table exist in database
  const tableExist = await Table.findOne({ tableNo });
  if (tableExist) {
    throw new Error("Table Already Exist");
  }
  // Validate if seciton exist in database
  const section = await Section.findById(sectionId);
  if (!section) {
    throw new Error("Section does not exist");
  }

  // Create new table
  const newTable = new Table(params);
  await newTable.save();

  // Update section
  section.tables?.push(newTable._id);
  await section.save();

  // Create token
  const token = jwt.sign(
    { table_id: newTable._id, tableNo },
    process.env.TOKEN_KEY as string,
    {
      expiresIn: "2h",
    }
  );

  return { newTable };
}

// Get All Tables
export async function getTables() {
  const tables = await Table.find({});
  return tables;
}

// Login With Table
export async function loginTable(tableNo: number) {
  // Validate table input
  if (!tableNo) {
    throw new Error("All input is required");
  }

  // Validate if table exist in our database
  const table = await Table.findOne<ITable>({ tableNo });
  if (table) {
    // Create token
    const token = jwt.sign(
      { table_id: table._id, tableNo },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );

    // save table token
    table.token = token;
    return token;
  } else {
    throw new Error("Invalid Table Number");
  }
}

// Get Specific Table
export async function getSpecificTable(tableNo: number) {
  if (!tableNo) {
    throw new Error("Invalide Error: Table number required");
  }

  try {
    const table = await Table.findOne({ tableNo: tableNo });
    if (!table) {
      throw new Error("Table not found");
    }
    return table;
  } catch (err) {
    console.error(err);
    throw new Error("Server error");
  }
}
