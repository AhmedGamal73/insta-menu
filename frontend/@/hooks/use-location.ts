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

export interface Location {
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

// POST City
export const postCity = async (city: City) => {
  return await locationAPI.post("/location/city", city);
};
// GET Cities
export const getCities = async () => {
  return await locationAPI.get("/location/city");
};

// GET District
export const getDistrict = async (cityName: string) => {
  return await locationAPI.get(`/location/district/${cityName}`);
};
