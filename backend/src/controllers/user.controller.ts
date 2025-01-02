import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Section from "../models/section.model";

export async function postUserController(req: Request, res: Response) {
  try {
    const {
      shiftType,
      role,
      name,
      username,
      password,
      age,
      phone,
      address,
      sectionId,
    } = req.body;

    // Check if all fields are provided
    if (!name || !username || !password || !phone || !role) {
      return res.status(400).json("All fields are required");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userNameExist = await User.findOne({ username });
    if (userNameExist) {
      return res.status(400).json("Username already exist");
    }

    const waiterSection = await Section.findById(sectionId);

    const user = new User({
      username,
      shiftType,
      name,
      age,
      phone,
      address,
      password: hashedPassword,
      sectionId: { id: waiterSection?._id, name: waiterSection?.name },
      tables: waiterSection?.tables,
    });

    await user.save();

    // Create usre token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET_KEY || "secret"
    );

    return res.status(201).json({ user: user, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET User By Id
export async function getUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Users
export async function getUsersController(req: Request, res: Response) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Waiters
export async function getWaitersController(req: Request, res: Response) {
  try {
    const waiters = await User.find({ role: "waiter" });
    return res.status(200).json(waiters);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function getWaitersByShiftController(req: Request, res: Response) {
  const shiftType = req.params.shiftType; // assuming shiftType is a route parameter

  try {
    const waiters = await User.find({ role: "waiter", shiftType: shiftType });
    return res.status(200).json(waiters);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Cashiers
export async function getCashiersController(req: Request, res: Response) {
  try {
    const cashier = await User.findOne({ role: "cashier" });
    return res.status(200).json(cashier);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Admins
export async function getAdminsController(req: Request, res: Response) {
  try {
    const admin = await User.findOne({ role: "admin" });
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
