import { Connection, Mongoose } from "mongoose";

import Tenant from "../models/tenant.model";
const { BASE_DB_URI } = process.env

const getAllTenants = async (adminDbConnection: Connection): Promise<any> => {
  try {
    // console.log("admin connection is:", adminDbConnection)
    const Tenant = await adminDbConnection.model("Tenant");
    const tenants = await Tenant.find({});
    console.log("getAllTenants tenants ok");
    return tenants;
  } catch (error) {
    console.log("getAllTenants error", error);
    throw error;
  }
};

const getOneTenant = async (adminDbConnection: Connection, id: string): Promise<any> => {
  try {
    // console.log("admin connection is:", adminDbConnection)
    const Tenant = await adminDbConnection.model("Tenant");
    const tenant = await Tenant.findById(id);
    return tenant;
  } catch (error) {
    console.log("getoneTenant error", error);
    throw error;
  }
};

const createTenant = async (adminDbConnection: Connection, body: any): Promise<any> => {
  console.log("admin db Connection from tenant service", adminDbConnection);
  try {
    const Tenant = await adminDbConnection.model("Tenant");
    const slug = body.slug;
    const tenantPresent = await Tenant.findOne({
      slug
    });
    if (tenantPresent) {
      throw new Error("Tenant Already Present");
    }
    const newTenant = await new Tenant({
      ...body,
    }).save();
    return newTenant;
  } catch (error) {
    console.log("createTenant error", error);
    throw error;
  }
};

export { getAllTenants, createTenant, getOneTenant };