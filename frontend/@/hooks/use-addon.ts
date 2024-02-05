import axios from "axios";
import { QueryClient, useQuery } from "react-query";

const addonApi = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

export interface Addon {
  _id?: string;
  name: string;
  price: number;
}

const queryClient = new QueryClient();
// Fetch all Addons
export const useAddons = () => {
  return useQuery({
    queryKey: ["addons"],
    queryFn: async () => {
      try {
        const { data } = await getAddons();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Addons
export const getAddons = async () => {
  return await addonApi.get("/addon");
};

// POST Category
export const createCategory = async (newAddon: Addon) => {
  return await addonApi.post("/addon", newAddon);
};
