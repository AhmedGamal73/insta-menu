"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerController = exports.postCustomerLogin = exports.getCustomers = exports.postCustomerSignup = void 0;
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_model_1 = require("../models/customer.model");
// POST customer signup
async function postCustomerSignup(req, res) {
    const { name, phone, password } = req.body;
    try {
        if (phone === undefined ||
            phone === null ||
            name === undefined ||
            name === null) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        // Check if phone number exists
        const phoneExist = await customer_model_1.Customer.findOne({ phone });
        if (phoneExist) {
            return res.status(406).json({ message: "Phone number already exists" });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await customer_model_1.Customer.create({
            name,
            phone,
            password: hashedPassword,
        });
        return res.json(customer);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
exports.postCustomerSignup = postCustomerSignup;
// GET customers
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
// POST customer login
async function postCustomerLogin(req, res) {
    try {
        const { phone, password } = req.body;
        // Check if phone number exists
        const customer = await customer_model_1.Customer.findOne({ phone });
        if (!customer) {
            return res.status(401).json({ message: "Invalid phone number" });
        }
        // Check if phone number and password are valid and Decrypt password
        const validPassword = await bcrypt.compare(password, customer?.password);
        if (!validPassword) {
            return res
                .status(401)
                .json({ message: "Invalid phone number or password" });
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Check secret key
        const secretKey = process.env.TOKEN_SECRET_KEY;
        if (secretKey === undefined) {
            return res.status(500).send("Server error");
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ _id: customer._id, phoneNumber: customer.phone }, secretKey, { expiresIn: "1w" });
        res.cookie("jwtToken", token, {
            httpOnly: false,
        });
        // Send token
        res.json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.postCustomerLogin = postCustomerLogin;
// GET Customer
async function getCustomerController(req, res) {
    const { customerId } = req.params;
    try {
        const customer = await customer_model_1.Customer.findById(customerId);
        return res.json(customer);
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}
exports.getCustomerController = getCustomerController;
//# sourceMappingURL=customer.controller.js.map