import { useActiveProductsByCategoryId } from "@/hooks/use-product";
import { Product } from "@/hooks/use-product";
import { Key } from "react";
import ProductCard from "./ProductCard";

export const ProductsList = ({ data, isLoading }) => {
  return (
    <div className="flex flex-col gap-6 pb-24 z-2">
      {data && data.length > 0
        ? data.map((product: Product, index: Key) => {
            return (
              <ProductCard
                index={index}
                product={product}
                totalProductLength={data.length}
              />
            );
          })
        : isLoading
        ? "يتم التحميل..."
        : "لا يوجد منتجات"}
    </div>
  );
};
