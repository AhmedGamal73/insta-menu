import axios from "axios";
import { useQuery } from "react-query";
import { Branch } from "@/types/branch";

const branchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add request interceptor to include tenant slug in headers
branchApi.interceptors.request.use((config) => {
  // Get tenant slug from URL path
  const path = window.location.pathname;
  const slug = path.split("/")[1]; // Gets 'tenant-slug' from '/tenant-slug/...'

  if (slug) {
    config.headers["slug"] = slug;
  }
  return config;
});

const getBranchById = async (branchId: string) => {
  return await branchApi.get(`/tenant/branch/${branchId}`);
};

const getActiveBranches = async () => {
  return await branchApi.get("/tenant/branches/active");
};

const getBranches = async () => {
  return await branchApi.get("/tenant/branch", {});
};

export const useGetBranches = () => {
  return useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      try {
        const { data } = await getBranches();
        return data.data;
      } catch (error) {
        console.error("Error fetching branches:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
  });
};

export const useGetBranchById = (branchId: string) => {
  return useQuery<Branch>({
    queryKey: ["branch", branchId],
    queryFn: async () => {
      try {
        const { data } = await getBranchById(branchId);
        return data;
      } catch (error) {
        console.error("Error fetching branch:", error);
        throw error;
      }
    },
    enabled: !!branchId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useGetActiveBranches = () => {
  return useQuery<Branch[]>({
    queryKey: ["activeBranches"],
    queryFn: async () => {
      try {
        const { data } = await getActiveBranches();
        return data;
      } catch (error) {
        console.error("Error fetching active branches:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });
};
