"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddonsController = exports.postAddonController = void 0;
const addon_model_1 = __importDefault(require("../models/addon.model"));
async function postAddonController(req, res) {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "All input is required" });
    }
    const addonExist = await addon_model_1.default.findOne({ name });
    if (addonExist) {
        return res.status(400).json({ message: "Addon already exists" });
    }
    const newAddon = new addon_model_1.default({ name, price });
    await newAddon.save();
    return res.status(201).json({ addon: newAddon });
}
exports.postAddonController = postAddonController;
async function getAddonsController(req, res) {
    try {
        const addons = await addon_model_1.default.find();
        return res.json(addons);
    }
    catch (error) {
        return res.status(500);
    }
}
exports.getAddonsController = getAddonsController;
//# sourceMappingURL=addon.controller.js.map