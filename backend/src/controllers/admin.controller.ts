import { Request, Response } from "express";

import {getConnection} from"../db/connectionManager";
import {getAllTenants, createTenant}  from "../services/tenant.service";

export const create = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection()
    console.log("create dbConnection", dbConnection);
    const tenant = await createTenant(dbConnection, req.body);
    res.status(200).json({ success: true, tenant });
  } catch (err: any) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const fetchAll = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection();
    console.log("fetchAll dbConnection", dbConnection.name);
    const tenants = await getAllTenants(dbConnection);
    res.status(200).json({ success: true, tenants });
  } catch (err: any) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

