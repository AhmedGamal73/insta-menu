import express, { Request, Response } from "express";
require("dotenv").config();
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";

import { Customer } from "../models/customer.model";

// POST customer signup
export async function postCustomerSignup(req: Request, res: Response) {
  const { name, phone, password } = req.body;

  try {
    if (
      phone === undefined ||
      phone === null ||
      name === undefined ||
      name === null
    ) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Check if phone number exists
    const phoneExist = await Customer.findOne({ phone });
    if (phoneExist) {
      return res.status(406).json({ message: "Phone number already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      phone,
      password: hashedPassword,
    });
    return res.json(customer);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// GET customers
export async function getCustomers(req: Request, res: Response) {
  try {
    const customers = await Customer.find();
    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// POST customer login
export async function postCustomerLogin(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;

    // Check if phone number exists
    const customer = await Customer.findOne({ phone });
    // Decrypt password
    const validPassword = await bcrypt.compare(password, customer?.password);
    // Check if phone number and password are valid
    if (!customer || !validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password" });
    }

    // Check secret key
    const secretKey = process.env.TOKEN_SECRET_KEY;
    if (secretKey === undefined) {
      return res.status(500).send("Server error");
    }

    // Generate token
    const token = jwt.sign(
      { _id: customer._id, phoneNumber: customer.phone },
      secretKey,
      { expiresIn: "1w" }
    );

    res.cookie("jwtToken", token, {
      httpOnly: false,
    });

    // Send token
    res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET Customer
export async function getCustomerController(req: Request, res: Response) {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findById(customerId);
    return res.json(customer);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
