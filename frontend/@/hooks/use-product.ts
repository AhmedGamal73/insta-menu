import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const productApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export type Product = {
  _id?: string;
  name: string;
  price?: number;
  salePrice?: number;
  description?: string;
  imgURL: string;
  categoryId?: string;
  subcategoryId?: string;
  variable?: boolean;
  variations?: {
    title: string;
    options: [{ name: string; price: number; salePrice: number }];
  };
  active?: boolean;
  addonCategory?: { id: string; name: string };
  addons?: string[];
  restaurantId: string;
};

// GET Products
const getProducts = async () => {
  return await productApi.get("/product");
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await getProducts();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

// GET Offer Products
export const useGetOfferProducts = () => {
  return useQuery({
    queryKey: ["offer-products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get("/product/offers");
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

// Active products
export const useActiveProducts = () => {
  return useQuery({
    queryKey: ["active-products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get("/product/active");
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

// GET Prodcuts by category name
export const useActiveProductsByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["productByCategory", categoryId],
    queryFn: async () => {
      try {
        const { data } = await getProductByCategory(categoryId);
        return data;
      } catch (error) {
        console.log(`Thier is an error: ${error}`);
        return { error: "There was an error fetching the category" };
      }
    },
    keepPreviousData: true,
  });
};

// GET Product By Id
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const { data } = await getProductById(id);
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

// GET Product By Restaurant Slug
export const useGetProductByRestaurant = (slug: string, categoryId: string) => {
  return useQuery({
    queryKey: ["restaurant-products", slug, categoryId],
    queryFn: async () => {
      try {
        const { data } = await getProductsByRestaurantSlugAndCategoryId(
          slug,
          categoryId
        );
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });
};

// Inactive products
export const useInActiveProducts = () => {
  return useQuery({
    queryKey: ["inactive-products"],
    queryFn: async () => {
      try {
        const { data } = await productApi.get(`/product/inactive`);
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

export const useUpdateProductActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const { data: currentProduct } = await productApi.get(`/product/${id}`);
      const response = await productApi.patch(`/product/${id}`, {
        active: !currentProduct.active,
      });
      return response.data.active;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        queryClient.invalidateQueries("active-products");
        queryClient.invalidateQueries("inactive-products");
      },
    }
  );
};

// DELETE Product
export const deleteProduct = async (id: string) => {
  return await productApi.delete(`/product/${id}`);
};

// POST Product
const postProduct = async (product: Product) => {
  return await productApi.post("/product", product);
};

// GET Product By Id
const getProductById = async (id: string) => {
  return await productApi.post(`/product/${id}`);
};
export default useProduct;

// Get Products By Category Name
export const getProductByCategory = async (categoryId: string) => {
  return await productApi.get(`/product/category/${categoryId}`);
};

// Get Products By Restaurant Slug
export const getProductsByRestaurantSlugAndCategoryId = async (
  slug: string,
  categoryId
) => {
  return await productApi.get(
    `/product/restaurant/${slug}/category/${categoryId}`
  );
};
