import axios from "axios";
import { QueryClient, useQuery } from "react-query";

const addonApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export interface Addon {
  _id?: string;
  name: string;
  price: number;
  addonCategoryId: string;
}

export interface AddonCategory {
  name: string;
}

// GET Addon By ID
export const useAddon = (id: string) => {
  return useQuery({
    queryKey: ["addon", id],
    queryFn: async () => {
      try {
        const { data } = await getAddonById(id);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!id,
  });
};

// GET Addons
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
    queryKey: ["addons-by-category", categoryId],
    queryFn: async () => {
      try {
        const { data } = await getAddonsByCategory(categoryId);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!categoryId,
  });
};

// GET Addon Categories
export const useGetAddonsCategories = () => {
  return useQuery({
    queryKey: ["addons-categories"],
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

// GET Addons by category
export const getAddonsByCategory = async (addonCategoryId: string) => {
  return await addonApi.get(`/addon/${addonCategoryId}`);
};

// POST Addon Category
export const postAddonCategory = async (newAddon: AddonCategory) => {
  return await addonApi.post("/addon/addoncategory", newAddon);
};

// POST Addon
export const postAddon = async (newAddon: Addon) => {
  return await addonApi.post("/addon", newAddon);
};

// GET Addons Categories
export const getAddonsCategories = async () => {
  return await addonApi.get("/addon/addoncategory");
};

// GET Addon By ID
export const getAddonById = async (id: string) => {
  return await addonApi.get(`/addon/${id}`);
};
