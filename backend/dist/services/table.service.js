"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificTable = exports.getTables = exports.postTable = void 0;
const table_model_1 = __importDefault(require("../models/table.model"));
const section_model_1 = __importDefault(require("../models/section.model"));
// Create Table
async function postTable(params) {
    const { tableNo, sectionId } = params;
    // Inputs validation
    if (!tableNo || typeof tableNo !== "number") {
        throw new Error("Invalid Table Number");
    }
    if (!sectionId || typeof sectionId !== "string") {
        throw new Error("Invalid Section ID");
    }
    // Validate if table exist in database
    // const tableExist = await Table.findOne({ tableNo });
    // if (tableExist) {
    //   return new Error("Table Already Exist");
    // }
    // Validate if seciton exist in database
    const section = await section_model_1.default.findById(sectionId);
    if (!section) {
        throw new Error("Section does not exist");
    }
    // Create new table
    const newTable = new table_model_1.default(params);
    await newTable.save();
    // Update section
    section.tables?.push({ id: newTable._id, number: tableNo });
    await section.save();
    return newTable;
}
exports.postTable = postTable;
// Get All Tables
async function getTables() {
    const tables = await table_model_1.default.find({}).populate("sectionId", "name -_id");
    return tables;
}
exports.getTables = getTables;
// GET Table
async function getSpecificTable(tableNo) {
    if (!tableNo) {
        throw new Error("Invalide Error: Table number required");
    }
    try {
        const table = await table_model_1.default.findOne({ tableNo: tableNo });
        if (!table) {
            throw new Error("Table not found");
        }
        return table;
    }
    catch (err) {
        console.error(err);
        throw new Error("Server error");
    }
}
exports.getSpecificTable = getSpecificTable;
//# sourceMappingURL=table.service.js.map