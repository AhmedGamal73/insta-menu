"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionsController = exports.getSection = exports.postSection = void 0;
const section_service_1 = require("../services/section.service");
async function postSection(req, res) {
    if (!(req.body && req.body.name)) {
        return res.status(400).json({ message: "Not Found" });
    }
    try {
        const section = await (0, section_service_1.createSection)(req.body.name);
        res.json(section);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
}
exports.postSection = postSection;
async function getSection(req, res) {
    if (!req.params.name) {
        return res.status(400).json({ message: "Section Name Not Provided" });
    }
    try {
        const section = await (0, section_service_1.getSectionByName)(req.params.name);
        return res.json(section);
    }
    catch (err) {
        console.log(err);
    }
}
exports.getSection = getSection;
// Get All Sections
async function getSectionsController(req, res) {
    try {
        const sections = await (0, section_service_1.getSections)();
        return res.json(sections);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
}
exports.getSectionsController = getSectionsController;
//# sourceMappingURL=section.controller.js.map