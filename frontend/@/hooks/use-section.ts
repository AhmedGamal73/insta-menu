import axios from "axios";
import { useQueries, useQuery } from "react-query";

interface Section {
  name: string;
}

const sectionApi = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

export const useSection = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const { data: sections } = await sectionApi.get("/section");
      return sections;
    },
  });
};

// Create new section

export default useSection;
