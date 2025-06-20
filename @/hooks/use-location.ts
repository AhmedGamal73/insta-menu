import axios from "axios";
import { QueryClient, useQuery } from "react-query";

const locationAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONGODB_URI,
});

export interface District {
  _id?: string;
  name: string;
  price: number;
  time: number;
}

export interface City {
  _id?: string;
  name: string;
  districts?: District[];
}

export interface Address {
  _id?: string;
  cityName: string;
  districtId: string;
  street: string;
}

// GET all Cities
export const useCities = (orderType: string) => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      try {
        const { data } = await getCities();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: orderType === "Delivery",
  });
};

// GET District
export const useDistrict = (cityName: string) => {
  return useQuery({
    queryKey: ["district", cityName],
    queryFn: async () => {
      try {
        const { data } = await getDistrict(cityName);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: !!cityName,
  });
};

export const useAddressById = (id: string) => {
  return useQuery({
    queryKey: ["address", id],
    queryFn: async () => {
      try {
        const { data } = await getAddressById(id);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: !!id,
  });
};

// POST City
export const postCity = async (city: City) => {
  return await locationAPI.post("/address/city", city);
};
// GET Cities
export const getCities = async () => {
  return await locationAPI.get("/address/city");
};

// GET District
export const getDistrict = async (cityName: string) => {
  return await locationAPI.get(`/address/district/${cityName}`);
};

// GET Address by ID
export const getAddressById = async (id: string) => {
  return await locationAPI.get(`/address/${id}`);
};
