import axios from "axios";
import { useQuery } from "react-query";

interface Restaurant {
  _id?: string;
  title: string;
  slug: string;
  tags: string;
  // description: string;
  bgImg: string;
}

export const API_URL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// GET Featured Restaurants
export const useGetFeaturedRestaurants = () => {
  return useQuery({
    queryKey: ["featured-restaurants"],
    queryFn: async () => {
      try {
        const { data } = await getFeaturedRestaurants();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Restaurant
export const useGetRestaurant = (slug: string) => {
  return useQuery({
    queryKey: ["restaurants", slug],
    queryFn: async () => {
      try {
        const { data } = await getRestaurant(slug);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: !!slug,
  });
};

// GET Restaurants
export const useGetRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      try {
        const { data } = await getRestaurants();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Restaurant Categories
export const useGetRestaurantCategories = (slug: string) => {
  return useQuery({
    queryKey: ["restaurant-categories", slug],
    queryFn: async () => {
      try {
        const { data } = await getRestaurantCategories(slug);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: !!slug,
  });
};

// GET Restaurant
export const getRestaurant = async (slug: string) => {
  return await API_URL.get(`/restaurant/${slug}`);
};

// POST Restaurant
export const postRestaurant = async (data: Restaurant) => {
  return await API_URL.post("/restaurant", data);
};

// GET Restaurants
export const getRestaurants = async () => {
  return await API_URL.get("/restaurant");
};

// GET Featured Restaurants
export const getFeaturedRestaurants = async () => {
  return await API_URL.get("/restaurant/featured");
};

// GET Restaurant Categories
export const getRestaurantCategories = async (slug: string) => {
  return await API_URL.get(`/restaurant/${slug}/categories`);
};
