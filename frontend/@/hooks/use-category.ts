import axios from "axios";
import { QueryClient, useQuery } from "react-query";

const categoryApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export interface Category {
  _id?: string;
  name: string;
  imgURL: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  _id?: string;
  name: string;
}

const queryClient = new QueryClient();

// Fetch all categories
export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data } = await getCategory();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Subcategories
export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      try {
        const { data } = await getSubcategories(categoryId);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: !!categoryId,
  });
};

// POST Subcategories
export const postSubcategories = async (
  categoryId: string,
  newSubcategory: Subcategory
) => {
  return await categoryApi.post(
    `/category/${categoryId}/subcategories`,
    newSubcategory
  );
};

// Get Subcategories
export const getCategory = async () => {
  return await categoryApi.get(`/category`);
};

// POST Category
export const createCategory = async (newCategory: Category) => {
  return await categoryApi.post("/category", newCategory);
};

// Get Subcategories
export const getSubcategories = async (categoryId: string) => {
  return await categoryApi.get(`/category/${categoryId}/sub`);
};
