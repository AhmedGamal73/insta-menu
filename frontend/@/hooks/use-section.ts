import axios from "axios";
import { useQueries, useQuery } from "react-query";

interface Section {
  name: string;
}

const sectionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONGODB_URI,
});

export const useGetSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const { data } = await sectionApi.get("/section");
      return data;
    },
  });
};

// Create new section

export default useGetSections;
