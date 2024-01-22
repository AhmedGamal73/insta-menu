import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import Table from "../models/table.model";
import { ITable } from "../models/table.model";
import Section from "../models/section.model";
import {
  postTableController,
  loginTableController,
  getTablesController,
} from "../controllers/table.controller";

// Dynamic route for table
const tableRouter = express.Router();

// Create new table
tableRouter.post("/", postTableController);

// fetching all tables
tableRouter.get("/", getTablesController);

// login route
tableRouter.post("/login", loginTableController);

// fetching a table
tableRouter.get("/:tableNo", getTablesController);

// Delete table
tableRouter.delete("/:tableNo", async (req, res) => {
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
tableRouter.put("/:tableNo", async (req: Request, res: Response) => {
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
