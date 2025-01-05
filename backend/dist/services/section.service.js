"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSections = exports.getSectionByName = exports.createSection = void 0;
const section_model_1 = __importDefault(require("../models/section.model"));
async function createSection(name) {
    // Section name to lower case
    const lowerCaseName = name.toLowerCase();
    try {
        // Find Section
        const isSectionExist = await section_model_1.default.findOne({ lowerCaseName });
        if (isSectionExist) {
            throw new Error("Section Already Exist");
        }
        // Create new section
        const newSection = await section_model_1.default.create({ name: lowerCaseName });
        return newSection;
    }
    catch (err) {
        console.log(err);
    }
}
exports.createSection = createSection;
// Get section by name
async function getSectionByName(sectionName) {
    // Find section
    const section = await section_model_1.default.findOne({ name: sectionName.toLowerCase() });
    if (section) {
        return section;
    }
    else {
        throw new Error("Section Not Found");
    }
}
exports.getSectionByName = getSectionByName;
// Get All Sections
async function getSections() {
    return await section_model_1.default.find({});
}
exports.getSections = getSections;
//# sourceMappingURL=section.service.js.map