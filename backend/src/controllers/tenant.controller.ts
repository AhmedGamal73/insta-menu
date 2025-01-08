import jwt from "jsonwebtoken";
// import { Tenant } from './../db/connectionManager';
import { PhoneNumber } from "./../../node_modules/twilio/lib/interfaces.d";
import { Request, Response } from "express";
import  { ITenant } from "../models/tenant.model";
import bcrypt from "bcryptjs";
import { getConnection } from "../db/connectionManager";
// import { createUser, getAllUsers } from "../services/user.service";
import {
  createTenant,
  getAllTenants,
  getOneTenant,
} from "../services/tenant.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const user = await createTenant(dbConnection, {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.status(200).json({ success: true, user });
  } catch (err: any) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection();
    console.log("fetchAll dbConnection", dbConnection.name);
    const users = await getAllTenants(dbConnection);
    res.status(200).json({ success: true, users });
  } catch (err: any) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const getTenant = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection();
    console.log("fetchAll dbConnection", dbConnection.readyState);
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "tenant id required as a parameter" });
    }
    const tenant = await getOneTenant(dbConnection, req.params.id);
    res.status(200).json({ success: true, tenant });
  } catch (err: any) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "email and password required" });
  }
  try {
    const adminDbConnection = getConnection()
    const Tenant = await adminDbConnection.model("Tenant");
    const tenant: ITenant | null = await Tenant.findOne(
      { email },
      { password: 1, slug: 1 }
    );
    console.log(tenant, "tenant found")
    if (!tenant) {
      res.status(400).json({ success: false, message: "Email doesn't exist" });
    }
    const isMatch =  bcrypt.compareSync(password, tenant?.password ?? "");
    if (isMatch) {
      const token = jwt.sign(
        { id: tenant?._id, slug: tenant?.slug },
        process.env.TOKEN_SECRET_KEY!,
        { expiresIn: "4d" }
      );
      return res.status(200).json({ success: true, token });
    }
    return res.status(401).json({success: false, message: "Invalid password"});
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { signUp, fetchAll, getTenant, login };
