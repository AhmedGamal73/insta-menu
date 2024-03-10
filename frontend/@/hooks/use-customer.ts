import axios from "axios";
import { useQuery } from "react-query";

export type CustomerSignup = {
  name: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export type CustomerLogin = {
  phone: string;
  password: string;
};

const customerAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONGODB_URI,
});

// POST Customer
export const useAddCustomer = (customer: CustomerSignup) => {
  return useQuery({
    queryKey: ["customerSignup", customer],
    queryFn: async () => {
      try {
        const { data } = await postCustomerSignin(customer);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
};

// GET Customer
export const useGetCustomer = (customer: CustomerLogin) => {
  return useQuery({
    queryKey: ["customerLogin", customer],
    queryFn: async () => {
      try {
        const { data } = await postCustomerLogin(customer);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
};

// POST Customer Signin
export const postCustomerSignin = async (customer: CustomerSignup) => {
  return await customerAPI.post("/customer/signup", customer);
};

// Post Customer
export const postCustomerLogin = async (customer: CustomerLogin) => {
  return await customerAPI.post("/customer/login", customer);
};
