import  jwt  from 'jsonwebtoken';
import User from "../models/user.model";
import Tenant from '../models/tenant.model';
import { NextFunction, Request, Response } from 'express';
interface IUser {
  _id: string;
  slug?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Optional user property
      tenant?: IUser; // Optional tenant property
    }
  }
}
const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    const secretKey: jwt.Secret = process.env.TOKEN_SECRET_KEY as jwt.Secret;
    if (!secretKey) {
      return res.status(500).json({ error: "Internal server error" });
    }

    let payload;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    let user:IUser | null = await User.findById(payload.id, {_id: 1});
    let tenant = null;

    if (!user) {
      tenant = await Tenant.findById(payload.id, {slug: 1});
    }

    if (!user && !tenant) {
      return res.status(404).json({ error: "User or Tenant not found" });
    }

    if (user) {
      req.user = user; // Attach user info to req.user
    } else if (tenant) {
      req.tenant = tenant; // Attach tenant info to req.tenant
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Authentication error" });
  }
};
