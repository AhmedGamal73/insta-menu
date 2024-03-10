import axios from "axios";
import { QueryClient, useQuery } from "react-query";

const addonApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONGODB_URI,
});

export interface Addon {
  _id?: string;
  name: string;
  price: number;
}

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

// GET Addons by category
export const useGetAddonsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["AddonsByCategory", categoryId],
    queryFn: async () => {
      try {
        const { data } = await getAddonsByCategory(categoryId);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
};

// GET AddonsCategories
export const useGetAddonsCategories = () => {
  return useQuery({
    queryKey: ["AddonCategory"],
    queryFn: async () => {
      try {
        const { data } = await getAddonsCategories();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
};

export const useGetProductAddons = (productId: string) => {
  return useQuery({
    queryKey: ["ProductAddons", productId],
    queryFn: async () => {
      try {
        const { data } = await getProductAddons(productId);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
};

// GET Addons
export const getAddons = async () => {
  return await addonApi.get("/addon");
};

// GET Addon names
export const getProductAddons = async (productId: string) => {
  return await addonApi.get(`/addon/product/${productId}`);
};

// POST Category
export const createCategory = async (newAddon: Addon) => {
  return await addonApi.post("/addon", newAddon);
};

// GET Addons by category
export const getAddonsByCategory = async (categoryId: string) => {
  return await addonApi.get(`/addon/${categoryId}`);
};

// GET AddonsCategories
export const getAddonsCategories = async () => {
  return await addonApi.get("/addoncategory");
};
