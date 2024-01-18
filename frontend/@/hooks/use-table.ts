import axios from "axios";
import { useQuery } from "react-query";

export type Table = {
  tableNo: Number;
  tableStatus: boolean;
  chairsNo: Number;
  section: string;
};

const tableApi = axios.create({
  baseURL: "http://localhost:3001",
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

export const addTable = async (table: Table) => {
  return await tableApi.post("/table", table);
};

export const checkTable = async (tableNo: Number) => {
  return await tableApi.get(`/product/${tableNo}`);
};

export default useTable;
