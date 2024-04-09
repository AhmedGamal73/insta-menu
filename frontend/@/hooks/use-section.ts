import axios from "axios";
import { useQueries, useQuery } from "react-query";

export interface Section {
  name: string;
}

const sectionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const useSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const { data } = await sectionApi.get("/section");
      return data;
    },
  });
};

// POST Section
export const postSection = async (section: Section) => {
  return await sectionApi.post("/section", section);
};

export default useSections;
