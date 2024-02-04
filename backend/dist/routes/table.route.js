"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const table_model_1 = __importDefault(require("../models/table.model"));
const section_model_1 = __importDefault(require("../models/section.model"));
const table_controller_1 = require("../controllers/table.controller");
// Dynamic route for table
const tableRouter = express_1.default.Router();
// Create new table
tableRouter.post("/", table_controller_1.postTableController);
// fetching all tables
tableRouter.get("/", table_controller_1.getTablesController);
// login route
tableRouter.post("/login", table_controller_1.loginTableController);
// fetching a table
tableRouter.get("/:tableNo", table_controller_1.getTablesController);
// Delete table
tableRouter.delete("/:tableNo", async (req, res) => {
    try {
        const table = await table_model_1.default.findOneAndDelete({ tableNo: req.params.tableNo });
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        return res.json({ message: "Table deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
// Update table
tableRouter.put("/:tableNo", async (req, res) => {
    try {
        // Find the section by name
        const section = await section_model_1.default.findOne({ name: req.body.section });
        const { section: _, ...rest } = req.body;
        // Update the table
        const table = await table_model_1.default.findOneAndUpdate({ tableNo: req.params.tableNo }, { ...rest, section: section?._id }, { new: true }).populate("section", "name -_id");
        // Update the section
        if (section) {
            section.tables?.push(table?._id);
            await section.save();
        }
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        return res.json(table);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.default = tableRouter;
//# sourceMappingURL=table.route.js.map