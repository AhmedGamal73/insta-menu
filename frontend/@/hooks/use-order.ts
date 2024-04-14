import axios from "axios";
import { Cart } from "./use-cart";
import { Address } from "./use-location";
import { useQuery } from "react-query";

const orderAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export type Order = {
  _id?: string;
  customerToken: string;
  orderName: string;
  tableNo: number;
  phoneNumber: string;
  address: Address;
  orderType?: string;
  quantity: number;
  cart: Cart[];
  subtotal?: number;
  total?: number;
  discount?: number;
  vat?: number;
  paymentMethod?: string;
  deliveryFee?: number;
  deliveryTime?: number;
  loungeTax?: number;
  promoCode?: number;
};

// GET Orders
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const { data } = await getOrders();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Order By Id
export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      try {
        const { data } = await getOrderById(id);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    enabled: !!id,
  });
};

// GET Delivery Orders
export const useDeliveryOrders = () => {
  return useQuery({
    queryKey: ["delivery-orders"],
    queryFn: async () => {
      try {
        const { data } = await getDeliveryOrders();
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

// GET Takeaway Orders
export const useTakeawayOrders = () => {
  return useQuery({
    queryKey: ["takeaway-orders"],
    queryFn: async () => {
      try {
        const { data } = await getTakeawayOrders();
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

// GET Takeaway Orders
export const useIndoorOrders = () => {
  return useQuery({
    queryKey: ["indoor-orders"],
    queryFn: async () => {
      try {
        const { data } = await getIndoorOrders();
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

// GET Order
export const getOrders = async () => {
  return await orderAPI.get("/order");
};

// GET delivery Orders
export const getDeliveryOrders = async () => {
  return await orderAPI.get("/order/order-type/delivery");
};

// GET Takeaway Orders
export const getTakeawayOrders = async () => {
  return await orderAPI.get("/order/order-type/takeaway");
};

// GET indoor Orders
export const getIndoorOrders = async () => {
  return await orderAPI.get("/order/order-type/indoor");
};

// POST Order
export const postOrder = async (order: Order) => {
  return await orderAPI.post("/order", order);
};

// Verify OTP
export const verifyOtp = async (data: object) => {
  return await orderAPI.post("/order/verify-otp", data);
};

// Generate OTP
export const generateOtp = async () => {
  return await orderAPI.post("/order/generate-otp");
};

// GET Order By ID
export const getOrderById = async (id: string) => {
  return await orderAPI.get(`/order/${id}`);
};

// Delete Order
export const deleteOrder = async (id: string) => {
  return await orderAPI.delete(`/order/${id}`);
};

// PUT Order
export const putOrder = async (id: string, order: Order) => {
  return await orderAPI.put(`/order/${id}`, order);
};

// PUT Order WaiterApproval
export const putOrderWaiterApproval = async (id: string, order: Order) => {
  return await orderAPI.put(`/order/waiter-approval/${id}`, order);
};
