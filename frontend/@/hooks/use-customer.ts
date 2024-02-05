import axios from "axios";

export type Customer = {
  name: string;
  phone: string;
  type: "indoor" | "outdoor";
  address: string;
};

const customerAPI = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

export const postCustomer = async (customer: Customer) => {
  return await customerAPI.post("/customer", customer);
};
