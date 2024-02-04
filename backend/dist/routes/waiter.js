"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waiter_1 = __importDefault(require("../models/waiter"));
const waiterRouter = (0, express_1.Router)();
waiterRouter.post("/", (req, res) => {
    try {
        const { name, age, phone, address } = req.body;
        if (!name || !age || !phone || !address) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        const newWaiter = new waiter_1.default({
            name,
            age,
            phone,
            address,
        });
        const savedWaiter = newWaiter.save();
        res.json(savedWaiter);
    }
    catch (err) {
        res.status(500);
    }
});
waiterRouter.get("/", (req, res) => {
    // get all waiters
    waiter_1.default.find()
        .then((waiters) => res.json(waiters))
        .catch((err) => res.status(400).json("Error: " + err));
});
exports.default = waiterRouter;
//# sourceMappingURL=waiter.js.map