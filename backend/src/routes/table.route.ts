import express from "express";

import {
  postTableController,
  getTablesController,
  deleteTableController,
  putTableController,
  getTableController,
} from "../controllers/table.controller";
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

const tableRouter = express.Router();

// POST Table
tableRouter.post("/", isAuthenticated, authorizeTenant,postTableController);

// GET Tables
tableRouter.get("/", getTablesController);

// GET Table
tableRouter.get("/:tableNo", getTableController);

// Delete table
tableRouter.delete("/:tableNo", isAuthenticated, authorizeTenant,deleteTableController);

// Update table
tableRouter.put("/:tableNo", isAuthenticated, authorizeTenant,putTableController);

export default tableRouter;
