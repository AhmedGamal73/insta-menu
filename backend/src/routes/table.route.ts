import express from "express";

import {
  postTableController,
  getTablesController,
  getTableController,
  deleteTableController,
  putTableController,
} from "../controllers/table.controller";

const tableRouter = express.Router();

// POST Table
tableRouter.post("/", postTableController);

// GET Tables
tableRouter.get("/", getTablesController);

// GET Table
// tableRouter.get("/:tableNo", getTableController);

// Delete table
tableRouter.delete("/:tableNo", deleteTableController);

// Update table
tableRouter.put("/:tableNo", putTableController);

export default tableRouter;
