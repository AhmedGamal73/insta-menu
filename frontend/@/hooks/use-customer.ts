import { API_URL } from "@/config/variables";
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

// POST Customer
export const useCustomerSignup = (customer: CustomerSignup) => {
  return useQuery({
    queryKey: ["customerSignup", customer],
    queryFn: async () => {
      try {
        const { data } = await postCustomerSignup(customer);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!customer,
  });
};

// POST Customer Login
export const useCustomerLogin = (customer: CustomerLogin) => {
  return useQuery({
    queryKey: ["customer-ogin", customer],
    queryFn: async () => {
      try {
        const { data } = await postCustomerLogin(customer);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!customer,
  });
};
// GET Customer By Id
export const useGetCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      try {
        const { data } = await getCustomer(customerId);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!customerId,
  });
};

// POST Customer Signin
export const postCustomerSignup = async (customer: CustomerSignup) => {
  return await API_URL.post("/customer/signup", customer);
};

// Post Customer
export const postCustomerLogin = async (customer: CustomerLogin) => {
  return await API_URL.post("/customer/login", customer);
};

// GET Customer
export const getCustomer = async (customerId: string) => {
  return await API_URL.get(`/customer/${customerId}`);
};

// PUT Add Customer Favorite
export const putCustomerAddFavorite = async (
  customerId: string,
  productId: string
) => {
  return await API_URL.put(`/customer/${customerId}/addfavorite/${productId}`);
};

// PUT Remove Customer Favorite
export const putCustomerRemoveFavorite = async (
  customerId: string,
  productId: string
) => {
  return await API_URL.put(
    `/customer/${customerId}/removefavorite/${productId}`
  );
};
