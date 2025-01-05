import { Connection } from "mongoose";

// import Tenant from "../models/tenant.model";
const { BASE_DB_URI } = process.env
console.log(BASE_DB_URI, "is it ok")

const getAllTenants = async (adminDbConnection: Connection): Promise<any> => {
  try {
    console.log("admin connection is:", adminDbConnection)
    const Tenant = await adminDbConnection.model("Tenant");
    const tenants = await Tenant.find({});
    console.log("getAllTenants tenants", tenants);
    return tenants;
  } catch (error) {
    console.log("getAllTenants error", error);
    throw error;
  }
};

const createTenant = async (adminDbConnection: Connection, body: any): Promise<any> => {
  console.log("admin db Connection from tenant service", adminDbConnection);
  try {
    const Tenant = await adminDbConnection.model("Tenant");
    const name = body.name;
    const tenantPresent = await Tenant.findOne({
      name
    });
    if (tenantPresent) {
      throw new Error("Tenant Already Present");
    }
    const newTenant = await new Tenant({
      name,
      dbURI: `${BASE_DB_URI}/mt_${name}`
    }).save();
    return newTenant;
  } catch (error) {
    console.log("createTenant error", error);
    throw error;
  }
};

export { getAllTenants, createTenant };