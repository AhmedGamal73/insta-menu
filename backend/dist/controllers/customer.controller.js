"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = exports.postCustomer = void 0;
const customer_model_1 = require("../models/customer.model");
async function postCustomer(req, res) {
    const { name, phone, type, address } = req.body;
    const newAddress = " ";
    try {
        // if (type !== "indoor" && !address) {
        //   throw new Error("Address is required for outdoor customers");
        // }
        const customer = await customer_model_1.Customer.create({
            name,
            phone,
            type,
            address: newAddress,
        });
        res.json(customer);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
exports.postCustomer = postCustomer;
// GET all customers
async function getCustomers(req, res) {
    try {
        const customers = await customer_model_1.Customer.find();
        return res.json(customers);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
exports.getCustomers = getCustomers;
//# sourceMappingURL=customer.controller.js.map