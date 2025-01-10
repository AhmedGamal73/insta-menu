import { tableSchema } from "../models/table.model";
import { sectionSchema } from "../models/section.model";
import { connectModel } from "../controllers/table.controller";
import { getConnection } from "../db/connectionManager";

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
  const Table = await connectModel("Table", tableSchema);
  // Validate if table exist in database
  const tableExist = await Table.findOne({ tableNo });
  if (tableExist) {
    return new Error("Table Already Exist");
  }
  // Validate if seciton exist in database
  const Section = await connectModel("Section", sectionSchema);
  const section = await Section.findById(sectionId);
  if (!section) {
    throw new Error("Section does not exist");
  }

  // Create new table
  const newTable = new Table(params);
  await newTable.save();

  // Update section
  section.tables?.push({ id: newTable._id, number: tableNo });
  await section.save();

  return newTable;
}

// Get All Tables
export async function getTables() {
  try {
    const dbConnection = await getConnection();
    // const Table = await connectModel("Table", tableSchema);
    const Table = await dbConnection.model("Table", tableSchema);
    const Section = await dbConnection.model("Section", sectionSchema);
    console.log("Table at get Service", Table)
    const tables = await Table.find({}).populate("sectionId", "name -_id");
    return tables;
  } catch (error: Error | any) {
    console.error("get tables service error", error);
    throw new Error(error)
  }
}

// GET Table
export async function getSpecificTable(tableNo: number) {
  if (!tableNo) {
    throw new Error("Invalide Error: Table number required");
  }

  try {
    const Table = await connectModel("Table", tableSchema);
    const table = await Table.findOne({ tableNo: tableNo });
    if (!table) {
      throw new Error("Table not found");
    }
    return table;
  } catch (err: Error | any) {
    console.error(err);
    throw new Error(err);
  }
}
