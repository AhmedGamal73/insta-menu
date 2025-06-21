import { Item } from "@/types/item";
import { Key, useEffect } from "react";
import LoadingScreen from "../ui/loadingScreen";
import ItemCard from "./ItemCard";

export const ItemsList = ({ data, isLoading }) => {
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="flex flex-col gap-6 pb-24 z-2">
      {isLoading ? (
        <LoadingScreen />
      ) : data && data.length > 0 ? (
        data.map((product: Item, index: Key) => {
          return (
            <ItemCard
              index={index}
              item={product}
              totalItemLength={data.length}
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
