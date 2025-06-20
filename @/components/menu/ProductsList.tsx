import { Product } from "@/hooks/use-product";
import { Key, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingScreen from "../ui/loadingScreen";

export const ProductsList = ({ data, isLoading }) => {
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="flex flex-col gap-6 pb-24 z-2">
      {isLoading ? (
        <LoadingScreen />
      ) : data && data.length > 0 ? (
        data.map((product: Product, index: Key) => {
          return (
            <ProductCard
              index={index}
              product={product}
              totalProductLength={data.length}
            />
          );
        })
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-3xl text-center">لا يوجد منتجات</h1>
          <p className="text-center">لا يوجد منتجات في هذا القسم</p>
        </div>
      )}
    </div>
  );
};
