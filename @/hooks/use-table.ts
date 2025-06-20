import axios from "axios";
import { useQuery } from "react-query";

export type ITable = {
  tableNo: Number;
  chairsNo: Number;
  sectionId: string;
  tableStatus: boolean;
};

const tableApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Get tables data
export const useTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const { data } = await getTables();
      return data;
    },
  });
};

export const useTable = (tableNo: number) => {
  return useQuery({
    queryKey: ["table", tableNo],
    queryFn: async () => {
      const { data } = await getTable(tableNo);
      return data;
    },
    enabled: !!tableNo,
  });
};

// GET Tables
export const getTables = async () => {
  return await tableApi.get("/table");
};

// GET Table
export const getTable = async (tableNo: number) => {
  return await tableApi.get(`/table/${tableNo}`);
};

// POST Table
export const postTable = async (table: ITable) => {
  return await tableApi.post("/table", table);
};

// Delete table
export const deleteTable = async (tableNo: Number) => {
  return await tableApi.delete(`/table/${tableNo}`);
};

export default useTable;
