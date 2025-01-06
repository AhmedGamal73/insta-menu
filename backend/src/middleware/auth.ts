import  jwt  from 'jsonwebtoken';
import User from "../models/user.model";
import Tenant from '../models/tenant.model';
import { NextFunction, Request, Response } from 'express';
const isAuthenticated =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }
    let payload;
    try {
      payload = jwt.verify(`${token}`, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    let savedToken = await Admin.findOne({ token });
    !savedToken && (savedToken = await User.findOne({ token }));
    
    if (!savedToken) {
      return res.status(401).json({ error: "Token not found in database" });
    }

    let user = await Admin.findById(payload.userId || payload.id);
    !user && (user = await User.findById(payload.id || payload.userId));
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = {
      _id: user._id,
      role: user.role, 
      permissions: user.permissions
    };
    
    next();
  } catch (error) {
    return res.status(500).json({ error: "Authentication error" });
  }
};
