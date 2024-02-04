"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificTableController = exports.loginTableController = exports.getTablesController = exports.postTableController = void 0;
const table_service_1 = require("../services/table.service");
async function postTableController(req, res) {
    if (req.body === null) {
        return res.status(400).json({ error: "Request body cannot be null" });
    }
    try {
        const table = await (0, table_service_1.postTable)(req.body);
        // return new table
        return res.status(201).json({ table: table });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
exports.postTableController = postTableController;
// Get Tables Controller
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
// Login Table
async function loginTableController(req, res) {
    try {
        // Get table input
        const { tableNo } = req.body;
        const token = await (0, table_service_1.loginTable)(tableNo);
        res.status(200).json({ token });
        return token;
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
    return "";
}
exports.loginTableController = loginTableController;
// Get Specific Table
async function getSpecificTableController(req, res) {
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
exports.getSpecificTableController = getSpecificTableController;
//# sourceMappingURL=table.controller.js.map