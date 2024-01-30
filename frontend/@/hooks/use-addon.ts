import axios from "axios";
import { QueryClient, useMutation, useQuery } from "react-query";

const categoryApi = axios.create({
  baseURL: process.env.NEXT_APP_API_URL,
});

export interface Category {
  _id?: string;
  name: string;
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
        const { data } = await categoryApi.get("/category");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// Fetch all prodcuts by category
export const useActiveProductByCategory = (categoryName: string) => {
  return useQuery({
    queryKey: ["productByCategory", categoryName],
    queryFn: async () => {
      try {
        const { data } = await categoryApi.get(
          `/category/${categoryName}/products`
        );
        return data;
      } catch (error) {
        console.log(`Thier is an error: ${error}`);
        return { error: "There was an error fetching the category" };
      }
    },
    keepPreviousData: true,
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

// POST Category
export const createCategory = async (newCategory: Category) => {
  return await categoryApi.post("/category", newCategory);
};

// Get Subcategories
export const getSubcategories = async (categoryId: string) => {
  return await categoryApi.get(`/category/${categoryId}/sub`);
};
