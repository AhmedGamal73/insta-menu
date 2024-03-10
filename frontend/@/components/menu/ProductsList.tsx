import { useActiveProductByCategory } from "@/hooks/use-category";
import { Product } from "@/hooks/use-product";
import { Key } from "react";
import ProductCard from "./ProductCard";

export const ProductsList = ({ selectedCategory }) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useActiveProductByCategory(selectedCategory);

  return (
    <div className="flex flex-col gap-6 pb-24">
      {selectedCategory && products && products.length > 0
        ? products.map((product: Product, index: Key) => {
            return (
              <ProductCard
                index={index}
                product={product}
                totalProductLength={products.length}
              />
            );
          })
        : isLoading
        ? "يتم التحميل..."
        : "لا يوجد منتجات"}
    </div>
  );
};
