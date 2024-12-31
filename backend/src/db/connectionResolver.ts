import { createNamespace } from "continuation-local-storage";

import {
  getConnectionByTenant,
  getAdminConnection
} from "./connectionManager";
import { NextFunction, Request, Response } from "express";

// Create a namespace for the application.
let nameSpace = createNamespace("unique context");

/**
 * Get the connection instance for the given tenant's name and set it to the current context.
 */
const resolveTenant = (req: Request, res: Response, next: NextFunction) => {
  const tenant = req.headers.tenant;

  if (!tenant) {
    return res
      .status(500)
      .json({ error: `Please provide tenant's name to connect` });
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const tenantDbConnection = getConnectionByTenant(tenant as string || "");
    console.log(
      "resolveTenant tenantDbConnection",
      tenantDbConnection && tenantDbConnection.name
    );
    nameSpace.set("connection", tenantDbConnection);
    next();
  });
};

/**
 * Get the admin db connection instance and set it to the current context.
 */
const setAdminDb = (req:Request, res: Response, next: NextFunction) => {
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection();
    console.log("setAdminDb adminDbConnection", adminDbConnection.name);
    nameSpace.set("connection", adminDbConnection);
    next();
  });
};

module.exports = { resolveTenant, setAdminDb };