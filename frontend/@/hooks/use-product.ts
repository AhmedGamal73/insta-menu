import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const productApi = axios.create({
  baseURL: "http://localhost:3001",
});

export type IProduct = {
  _id?: string;
  name: string;
  price?: null;
  salePrice?: null;
  description: string;
  imgURL?: string;
  category: string;
  variable: boolean;
  sizes?: [{ name: string; quantity: number; price: number }];
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get("/product");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// Delete product
// export const mutation = useMutation({
//   mutationFn: async (id: string) => {
//     try {
//       const { data } = await productApi.delete(`/product/${id}`);
//       return data;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },
// });

export const deleteProduct = async (id: string) => {
  return await productApi.delete(`/product/${id}`);
};

export default useProduct;
