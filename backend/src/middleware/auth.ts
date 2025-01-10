import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ITenant, tenantSchema } from "../models/tenant.model";
import { userSchema } from "../models/user.model";
import { initAdminDbConnection } from "../db/adminDbConnections";
const { BASE_DB_URI, ADMIN_DB_NAME } = process.env;
interface IUser {
  _id: string;
  slug?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Optional user property
      tenant?: ITenant; // Optional tenant property
    }
  }
}
const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const dbConnection = initAdminDbConnection(`${BASE_DB_URI}/${ADMIN_DB_NAME}`);
  if (!dbConnection) {
    return res.status(500).json({ error: "Database connection failed" });
  }
  const Tenant = await dbConnection.model("Tenant", tenantSchema);
  const User = await dbConnection.model("User", userSchema);
  try {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    const secretKey: jwt.Secret = process.env.TOKEN_SECRET_KEY as jwt.Secret;
    if (!secretKey) {
      return res.status(500).json({ error: "Internal server error" });
    }

    let payload: JwtPayload | string;
    try {
      payload = jwt.verify(token, secretKey);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    if (typeof payload === "string") {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    let user: IUser | null = await User.findById(payload.id, { _id: 1 });
    let tenant: ITenant | null = null;

    if (!user) {
      tenant = await Tenant.findById(payload.id, { slug: 1 });
    }

    console.log("payload:", payload, user, tenant);
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

export const authorizeTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dbConnection = initAdminDbConnection(`${BASE_DB_URI}/${ADMIN_DB_NAME}`);
    if (!dbConnection) {
      return res.status(500).json({ error: "Database connection failed" });
    }
    const Tenant = await dbConnection.model("Tenant", tenantSchema);
    const tenant = await Tenant.findById(req.tenant?._id, { slug: 1 });
    if (!tenant) {
      return res.status(401).json({ success: false, message: "Tenant not found" });
    }
    if (tenant?.slug === req.headers.tenant) {
      return next();
    }
    return res
      .status(403)
      .json({ success: false, message: "Tenant not authorized" });
  } catch (error) {
    console.error("Authorization error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
export default isAuthenticated;
