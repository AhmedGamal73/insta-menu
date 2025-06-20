import { useQuery } from "react-query";

// import { API_URL } from "../config/variables";
import { User } from "../types/user";
import { API_URL } from "@/config/variables";

// GET Users
export const useUsers = () => {
  return useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      try {
        const { data } = await getUsers();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Waiters
export const useWaiters = () => {
  return useQuery({
    queryKey: ["Waiters"],
    queryFn: async () => {
      try {
        const { data } = await getWaiters();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Waiters By Shift
export const useWaitersByShift = (shift: string) => {
  return useQuery({
    queryKey: ["WaitersByShift", shift],
    queryFn: async () => {
      try {
        const { data } = await getWaitersByShift(shift);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// POST User
export const postUser = async (order: User) => {
  return await API_URL.post("/user", order);
};

// GET Users
export const getUsers = async () => {
  return await API_URL.get("/user");
};

// GET Waiters
export const getWaiters = async () => {
  return await API_URL.get("/user/waiters");
};
// GET Waiters
export const getWaitersByShift = async (shift: string) => {
  return await API_URL.get(`/user/waiters/${shift}`);
};

// GET Cashiers
export const getCashiers = async () => {
  return await API_URL.get("/user/cashiers");
};
// GET Admin
export const getAdmin = async () => {
  return await API_URL.get("/user/admins");
};
