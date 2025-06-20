import { API_URL } from "@/config/variables";
import { useQueries, useQuery } from "react-query";

export interface Section {
  name: string;
}

export const useSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const { data } = await API_URL.get("/section");
      return data;
    },
  });
};

// POST Section
export const postSection = async (section: Section) => {
  return await API_URL.post("/section", section);
};

export default useSections;
