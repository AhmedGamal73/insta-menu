import { createNamespace } from "continuation-local-storage";

import { getConnectionByTenant, getAdminConnection } from "./connectionManager";
import { NextFunction, Request, Response } from "express";
import { Connection } from "mongoose";

// Create a namespace for the application.
let nameSpace = createNamespace("unique context");

/**
 * Get the connection instance for the given tenant's name and set it to the current context.
 */
export const resolveTenant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tenant = req.headers.tenant;

  if (!tenant) {
    return res
      .status(500)
      .json({ error: `Please provide tenant's name to connect` });
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    try {
      const tenantDbConnection = getConnectionByTenant(tenant as string);
      console.log(
        "resolveTenant tenantDbConnection",
        tenantDbConnection && tenantDbConnection
      );
      nameSpace.set("connection", tenantDbConnection);
      next();
    } catch (error) {
      console.error("Error resolving tenant:", error);
      next(error); // Pass the error to the next middleware
    }
  });
};

/**
 * Get the admin db connection instance and set it to the current context.
 */
export const setAdminDb = (req: Request, res: Response, next: NextFunction) => {
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection: Connection = getAdminConnection();
    console.info(
      "setAdminDb adminDbConnection:",
      JSON.stringify(adminDbConnection, null, 2)
    );
    // Optionally log specific properties
    console.info("Admin DB Connection Name:", adminDbConnection.name); // This may return undefined if not set
    console.info("Admin DB Connection State:", adminDbConnection.readyState); // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    nameSpace.set("connection", adminDbConnection);
    next();
  });
};
