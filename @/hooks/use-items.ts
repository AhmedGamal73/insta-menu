import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Item } from "@/types/item";

const itemApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add request interceptor to include tenant slug in headers
itemApi.interceptors.request.use((config) => {
  // Get tenant slug from URL path
  const path = window.location.pathname;
  const tenantSlug = path.split("/")[1];

  if (tenantSlug) {
    config.headers["slug"] = tenantSlug;
  }
  return config;
});

export const useGetItems = (branchId: string) => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const { data } = await getItems(branchId);
        return data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

// GET Offer Items
export const useGetOfferItems = () => {
  return useQuery({
    queryKey: ["offer-items"],
    queryFn: async () => {
      try {
        const { data } = await itemApi.get("/item/offers");
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// Active items
export const useGetActiveItems = (branchId: string) => {
  return useQuery({
    queryKey: ["active-items"],
    queryFn: async () => {
      try {
        const { data } = await getActiveItemsByBranchId(branchId);
        return data.items;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// GET Items by category name
export const useActiveItemsByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["itemByCategory", categoryId],
    queryFn: async () => {
      try {
        const { data } = await getItemByCategory(categoryId);
        return data;
      } catch (error) {
        console.log(`Thier is an error: ${error}`);
        return { error: "There was an error fetching the category" };
      }
    },
    keepPreviousData: true,
    enabled: !!categoryId,
  });
};

// GET Item By Id
export const useGetItemById = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      try {
        const { data } = await getItemById(id);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

// Inactive items
export const useInActiveItems = () => {
  return useQuery({
    queryKey: ["inactive-items"],
    queryFn: async () => {
      try {
        const { data } = await itemApi.get(`/item/inactive`);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// Update Active Item
export const useUpdateItemActiveStatus = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const tenantSlug = router.query.tenantId as string;

  return useMutation(
    async (id: string) => {
      const { data: currentItem } = await itemApi.get(`/item/${id}`);
      const response = await itemApi.patch(`/item/${id}`, {
        active: !currentItem.active,
      });
      return response.data.active;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items", tenantSlug]);
        queryClient.invalidateQueries(["active-items", tenantSlug]);
        queryClient.invalidateQueries(["inactive-items", tenantSlug]);
      },
    }
  );
};

// GET Items
const getItems = async (branchId: string) => {
  return await itemApi.get(`/tenant/branch`);
};

// GET Active Items by branch ID
const getActiveItemsByBranchId = async (branchId) => {
  return await itemApi.get(`/tenant/item/branch/${branchId}/active`);
};

// DELETE Item
export const deleteItem = async (id: string) => {
  return await itemApi.delete(`/item/${id}`);
};

// POST Item
const postItem = async (item: Item) => {
  return await itemApi.post("/item", item);
};

// GET Item By Id
const getItemById = async (id: string) => {
  return await itemApi.post(`/item/${id}`);
};

// Get Items By Category Name
export const getItemByCategory = async (categoryId: string) => {
  return await itemApi.get(`/item/category/${categoryId}`);
};

// Get Items By Restaurant Slug
export const getItemsBySlugAndCategoryId = async (slug: string, categoryId) => {
  return await itemApi.get(`/item/restaurant/${slug}/category/${categoryId}`);
};
