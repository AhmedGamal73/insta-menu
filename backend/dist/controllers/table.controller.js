"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTableController = exports.deleteTableController = exports.getTableController = exports.getTablesController = exports.postTableController = void 0;
const QRCode = __importStar(require("qrcode"));
const env = require("dotenv").config();
const section_model_1 = __importDefault(require("../models/section.model"));
const table_service_1 = require("../services/table.service");
const table_model_1 = __importDefault(require("../models/table.model"));
// POST Table
async function postTableController(req, res) {
    if (req.body === null) {
        return res.status(400).json({ error: "Request body cannot be null" });
    }
    try {
        // const table = await postTable(req.body);
        const table = new table_model_1.default(req.body);
        await table.save();
        const qrCode = await QRCode.toDataURL(`http://${process.env.MENU_URL}/menu?tableNo=${table.tableNo}`);
        table.qrCode = qrCode;
        await table.save();
        // return new table
        return res.status(201).json({ table: table });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
exports.postTableController = postTableController;
// GET Tables
async function getTablesController(req, res) {
    try {
        const tables = await (0, table_service_1.getTables)();
        res.status(202).json(tables);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Server error");
    }
}
exports.getTablesController = getTablesController;
// GET Table
async function getTableController(req, res) {
    try {
        const { tableNo } = req.body;
        const table = await (0, table_service_1.getSpecificTable)(tableNo);
        return res.status(202).json(table);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}
exports.getTableController = getTableController;
// Delete Table
async function deleteTableController(req, res) {
    try {
        const { tableNo } = req.body;
        const table = await table_model_1.default.findOneAndDelete({ tableNo: tableNo });
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        return res.json({ message: "Table deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}
exports.deleteTableController = deleteTableController;
// PUT Table
async function putTableController(req, res) {
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
}
exports.putTableController = putTableController;
//# sourceMappingURL=table.controller.js.map