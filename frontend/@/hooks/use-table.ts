import axios from "axios";
import { useQuery } from "react-query";

export type ITable = {
  tableNo: Number;
  tableStatus?: boolean;
  chairsNo: Number;
  sectionId: string;
};

const tableApi = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
});

// Get tables data
export const useTable = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const { data } = await tableApi.get("/table");
      return data;
    },
  });
};

// Add new table
export const getTables = async () => {
  return await tableApi.get("/table");
};

// Add new table
export const addTable = async (table: ITable) => {
  return await tableApi.post("/table", table);
};

// Delete table
export const deleteTable = async (tableNo: Number) => {
  return await tableApi.delete(`/table/${tableNo}`);
};

export default useTable;
