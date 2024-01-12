import express, { Request, Response } from "express";
import Table from "../models/table";
import jwt from "jsonwebtoken";
import { ITable } from "../models/table";
import Section from "../models/section";

// Dynamic route for table
const tableRouter = express.Router();

// Create new table
tableRouter.post("/table", async (req, res) => {
  try {
    const { tableNo }: ITable = req.body;

    // Validate table input
    if (!tableNo) {
      return res.status(400).send("All input is required");
    }

    // Validate if table exist in our database
    const tableExist = await Table.findOne({ tableNo });
    if (tableExist) {
      return res.status(400).send("Table Already Exist");
    }

    const section = await Section.findOne({ name: req.body.section });
    if (!section) {
      return res.status(400).send("Section does not exist");
    }
    const newTable = new Table({ ...req.body, section: section._id });
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

    // return new table
    return res.status(201).json({ token, table: newTable });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      const errorCode = (err as any).code;
      if (errorCode === 11000) {
        res.status(400).send("Duplicate table");
      } else {
        res.status(500).send("Server error");
      }
      res.status(400).send("Table already exists");
    }
  }
});

// login route
tableRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // Get table input
    const { tableNo }: ITable = req.body;

    // Validate table input
    if (!tableNo) {
      res.status(400).send("All input is required");
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

      // table
      return res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid tableNo" });
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// fetching a table
tableRouter.get("/table/:tableNo", async (req, res) => {
  try {
    const table = await Table.findOne({ tableNo: req.params.tableNo });
    if (table) {
      res.json(table);
    } else {
      res.status(404).send("Table not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// fetching all tables
tableRouter.get("/tables", async (req, res) => {
  try {
    const tables = await Table.find().populate("section", "name _id");
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete table
tableRouter.delete("/table/:tableNo", async (req, res) => {
  try {
    const table = await Table.findOneAndDelete({ tableNo: req.params.tableNo });

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.json({ message: "Table deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update table
tableRouter.put("/table/:tableNo", async (req: Request, res: Response) => {
  try {
    // Find the section by name
    const section = await Section.findOne({ name: req.body.section });

    const { section: _, ...rest } = req.body;
    // Update the table
    const table = await Table.findOneAndUpdate(
      { tableNo: req.params.tableNo },
      { ...rest, section: section?._id },
      { new: true }
    ).populate("section", "name -_id");

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
});

export default tableRouter;
