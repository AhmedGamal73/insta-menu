import express, { Request, Response } from "express";
import { Customer } from "../models/customer.model";

export async function postCustomer(req: Request, res: Response) {
  const { name, phone, type, address } = req.body;
  const newAddress = " ";
  try {
    // if (type !== "indoor" && !address) {
    //   throw new Error("Address is required for outdoor customers");
    // }

    const customer = await Customer.create({
      name,
      phone,
      type,
      address: newAddress,
    });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// GET all customers
export async function getCustomers(req: Request, res: Response) {
  try {
    const customers = await Customer.find();
    return res.json(customers);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
