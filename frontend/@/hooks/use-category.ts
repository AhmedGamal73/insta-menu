import axios from "axios";
import { useQuery } from "react-query";

const categoryApi = axios.create({
  baseURL: "http://localhost:3001",
});

export interface Category {
  name: string;
}

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
export const useProductByCategory = (categoryName: string) => {
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
