import { Connection } from "mongoose";
import  Tenant, {ITenant}  from "../models/tenant.model";

 const getAllTenants = async (
  adminConnection: Connection
): Promise<ITenant[]> => {
    try {
        const tenants = await Tenant.find({}).exec(); // Fetch all tenants
        return tenants;
      } catch (error) {
        console.error("Error fetching tenants:", error);
        throw new Error("Could not retrieve tenants");
      }
    };
export default { getAllTenants };