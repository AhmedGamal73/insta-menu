import { API_URL } from "@/config/variables";
import { useQuery } from "react-query";
import { Tenant } from "@/types/tenant";

// Get tenant by slug
const getTenant = async (slug: string) => {
  try {
    const { data } = await API_URL.get(`/main/auth/tenant/${slug}`);
    return data;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    throw error;
  }
};

export const useTenant = (slug: string) => {
  return useQuery<Tenant>({
    queryKey: ["tenant", slug],
    queryFn: () => getTenant(slug),
    enabled: !!slug, // Only run query if identifier is provided
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
    retry: 2, // Retry failed requests twice
    onError: (error) => {
      console.error("Error in useTenant hook:", error);
    },
  });
};

// Get all active tenants
const getActiveTenants = async () => {
  try {
    const { data } = await API_URL.get("/tenant/active");
    return data;
  } catch (error) {
    console.error("Error fetching active tenants:", error);
    throw error;
  }
};

export const useActiveTenants = () => {
  return useQuery<Tenant[]>({
    queryKey: ["activeTenants"],
    queryFn: getActiveTenants,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
    retry: 2, // Retry failed requests twice
    onError: (error) => {
      console.error("Error in useActiveTenants hook:", error);
    },
  });
};

// Get tenant by subdomain
const getTenantBySubdomain = async (subdomain: string) => {
  try {
    const { data } = await API_URL.get(`/tenant/subdomain/${subdomain}`);
    return data;
  } catch (error) {
    console.error("Error fetching tenant by subdomain:", error);
    throw error;
  }
};

export const useTenantBySubdomain = (subdomain: string) => {
  return useQuery<Tenant>({
    queryKey: ["tenant", "subdomain", subdomain],
    queryFn: () => getTenantBySubdomain(subdomain),
    enabled: !!subdomain, // Only run query if subdomain is provided
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
    retry: 2, // Retry failed requests twice
    onError: (error) => {
      console.error("Error in useTenantBySubdomain hook:", error);
    },
  });
};
