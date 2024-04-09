import axios from "axios";
import { useQuery } from "react-query";

export type CartItems = {
  productId: string;
  quantity: number;
  price: number;
  addons?: string[];
  note: string;
};

export type Cart = {
  _id?: string;
  items: CartItems[];
};

const cartAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// GET Cart
export const useGetCartById = (id: string) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: async () => {
      try {
        const { data } = await getCart(id);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Cart
export const getCart = async (id: string) => {
  return await cartAPI.get(`/cart/${id}`);
};
