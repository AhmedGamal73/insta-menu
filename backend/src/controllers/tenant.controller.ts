import { Request, Response } from "express";

import { getConnection } from "../db/connectionManager";
import {createUser, getAllUsers}  from "../services/user.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const user = await createUser(dbConnection, req.body);
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
    const users = await getAllUsers(dbConnection);
    res.status(200).json({ success: true, users });
  } catch (err: any) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export { signUp, fetchAll };