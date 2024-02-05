import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export type Product = {
  _id?: string;
  name: string;
  price: null;
  salePrice: null;
  description: string;
  imgURL?: string;
  categoryId: string;
  subcategoryId?: string;
  variable?: boolean;
  variations?: [{ name: string; quantity: number; price: number }];
  active?: boolean;
};

// GET Products
const getProducts = async () => {
  return await productApi.get("/product");
};
export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await getProducts();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

// Active products
export const useActiveProducts = () => {
  return useQuery({
    queryKey: ["active-products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get("/product/active");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// Inactive products
export const useInActiveProducts = () => {
  return useQuery({
    queryKey: ["inactive-products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get(`/product/inactive`);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProductActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { data: currentProduct } = await productApi.get(`/product/${id}`);
      const response = await productApi.patch(`/product/${id}`, {
        active: !currentProduct.active,
      });
      return response.data.active;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        queryClient.invalidateQueries("active-products");
        queryClient.invalidateQueries("inactive-products");
      },
    }
  );
};

// DELETE Product
export const deleteProduct = async (id: string) => {
  return await productApi.delete(`/product/${id}`);
};

// POST Product
const postProduct = async (product: Product) => {
  return await productApi.post("/product", product);
};
export default useProduct;
