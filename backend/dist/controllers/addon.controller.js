"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductAddonsController = exports.getAddonsByCategoryController = exports.deleteAddonController = exports.getAddonsController = exports.postAddonController = void 0;
const addon_model_1 = require("../models/addon.model");
const product_model_1 = __importDefault(require("../models/product.model"));
// POST addon
async function postAddonController(req, res) {
    const { name, price, categoryId } = req.body;
    if (!name || !price || !categoryId) {
        return res.status(400).json({ message: "All input is required" });
    }
    const addonExist = await addon_model_1.Addon.findOne({ name });
    if (addonExist) {
        return res.status(400).json({ message: "Addon already exists" });
    }
    const newAddon = new addon_model_1.Addon({ name, price, categoryId });
    await newAddon.save();
    return res.status(201).json({ addon: newAddon });
}
exports.postAddonController = postAddonController;
// GET addons
async function getAddonsController(req, res) {
    try {
        const addons = await addon_model_1.Addon.find();
        return res.json(addons);
    }
    catch (error) {
        return res.status(500);
    }
}
exports.getAddonsController = getAddonsController;
// DELETE addon
async function deleteAddonController(req, res) {
    try {
        const { id } = req.params;
        const addon = await addon_model_1.Addon.findById(id);
        if (!addon) {
            return res.status(404).json({ message: "Addon not found" });
        }
        await addon.deleteOne();
        return res.json({ message: "Addon deleted" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.deleteAddonController = deleteAddonController;
// GET addons by category
async function getAddonsByCategoryController(req, res) {
    try {
        const { categoryId } = req.params;
        const addons = await addon_model_1.Addon.find({ categoryId });
        return res.json(addons);
    }
    catch (error) {
        return res.status(500);
    }
}
exports.getAddonsByCategoryController = getAddonsByCategoryController;
// GET Product addons
async function getProductAddonsController(req, res) {
    const { productId } = req.params;
    try {
        const product = await product_model_1.default.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        const addonArray = product.addons;
        let productAddons = [];
        if (addonArray) {
            for (let i = 0; i < addonArray.length; i++) {
                const addon = await addon_model_1.Addon.findById(addonArray[i]);
                if (addon) {
                    productAddons.push(addon);
                }
            }
        }
        return res.status(200).send(productAddons);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.getProductAddonsController = getProductAddonsController;
//# sourceMappingURL=addon.controller.js.map