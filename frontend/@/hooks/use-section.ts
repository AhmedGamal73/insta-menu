import axios from "axios";
import { useQueries, useQuery } from "react-query";

interface Section {}

const sectionApi = axios.create({
  baseURL: "http://localhost:3001",
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

export default useSection;
