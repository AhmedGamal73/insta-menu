import { PhoneNumber } from "./../../node_modules/twilio/lib/interfaces.d";
import { Request, Response } from "express";

import { getConnection } from "../db/connectionManager";
// import { createUser, getAllUsers } from "../services/user.service";
import { createTenant, getAllTenants, getOneTenant } from "../services/tenant.service";

const signUp = async (req: Request, res: Response) => {
  try {
    
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const user = await createTenant(dbConnection, req.body);
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
    if(!req.params.id) {
      return res.status(400).json({ success: false, message: "tenant id required as a parameter" });
    }
    const tenant = await getOneTenant(dbConnection, req.params.id);
    res.status(200).json({ success: true, tenant });
  } catch (err: any) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export { signUp, fetchAll, getTenant };
