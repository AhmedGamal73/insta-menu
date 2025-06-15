import { API_URL } from "@/config/variables";
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
  return await API_URL.get(`/cart/${id}`);
};
