import { useProductByCategory } from "@/hooks/use-category";
import { IProduct } from "@/hooks/use-product";
import { Key } from "react";
import ProductCard from "./ProductCard";

export const ProductsList = ({ selectedCategory }) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useProductByCategory(selectedCategory);

  return selectedCategory && products && products.length > 0
    ? products.map((product: IProduct, index: Key) => {
        return <ProductCard index={index} product={product} />;
      })
    : isLoading
    ? "يتم التحميل..."
    : "لا يوجد منتجات";
};
