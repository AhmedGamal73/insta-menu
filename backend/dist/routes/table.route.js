"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const table_controller_1 = require("../controllers/table.controller");
const tableRouter = express_1.default.Router();
// POST Table
tableRouter.post("/", table_controller_1.postTableController);
// GET Tables
tableRouter.get("/", table_controller_1.getTablesController);
// GET Table
tableRouter.get("/:tableNo", table_controller_1.getTableController);
// Delete table
tableRouter.delete("/:tableNo", table_controller_1.deleteTableController);
// Update table
tableRouter.put("/:tableNo", table_controller_1.putTableController);
exports.default = tableRouter;
//# sourceMappingURL=table.route.js.map