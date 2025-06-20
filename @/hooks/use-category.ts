import { API_URL } from "@/config/variables";
import { Category, Subcategory } from "@/types/category";
import { QueryClient, useQuery } from "react-query";

// GET Categories
export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data } = await getCategories();
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
  return await API_URL.post(
    `/category/${categoryId}/subcategories`,
    newSubcategory
  );
};

// Get Categories
export const getCategories = async () => {
  return await API_URL.get(`/category`);
};

// POST Category
export const createCategory = async (newCategory: Category) => {
  return await API_URL.post("/category", newCategory);
};

// Get Subcategories
export const getSubcategories = async (categoryId: string) => {
  return await API_URL.get(`/category/${categoryId}/sub`);
};
