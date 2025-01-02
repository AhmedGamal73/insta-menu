import { getNamespace, Namespace } from "continuation-local-storage";
import { initAdminDbConnection } from "./adminDbConnections";
import { initTenantDbConnection } from "./tenantDbConnections";
import tenantService from "../services/tenant.service";

export interface Tenant {
  name: string;
  dbURI: string;
}
const { BASE_DB_URI, ADMIN_DB_NAME } = process.env;
const baseUri = (process.env.BASE_DB_URI as String) || BASE_DB_URI;
const adminDbName = (process.env.ADMIN_DB_NAME as String) || ADMIN_DB_NAME;

let connectionMap: Record<string, any> = {};
let adminDbConnection: any;

/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async (): Promise<void> => {
  let tenants: Tenant[];
  const ADMIN_DB_URI = `${baseUri}/${adminDbName}`;
  adminDbConnection = initAdminDbConnection(ADMIN_DB_URI);
  console.log("connectAllDb adminDbConnection", adminDbConnection.name);
  try {
    tenants = await tenantService.getAllTenants(adminDbConnection);
    console.log("connectAllDb tenants", tenants);
  } catch (e) {
    console.log("connectAllDb error", e);
    return;
  }

  connectionMap = tenants
    .map(tenant => {
      return {
        [tenant.name]: initTenantDbConnection(tenant.dbURI)
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
  console.log("connectAllDb connectionMap", connectionMap);
};

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
const getConnectionByTenant = (tenantName: string): any => {
  console.log(`Getting connection for ${tenantName}`);
  if (connectionMap) {
    return connectionMap[tenantName];
  }
};

/**
 * Get the admin db connection.
 */
const getAdminConnection = (): any => {
  if (adminDbConnection) {
    console.log("Getting adminDbConnection");
    return adminDbConnection;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection = (): any => {
  const nameSpace: Namespace | undefined = getNamespace("unique context");
  const conn = nameSpace?.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any tenant database");
  }

  return conn;
};

export {
  connectAllDb,
  getAdminConnection,
  getConnection,
  getConnectionByTenant
};