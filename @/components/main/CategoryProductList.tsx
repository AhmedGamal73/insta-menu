import { Key } from "react";
import * as React from "react";

import { useActiveProductsByCategoryId } from "@/hooks/use-items";
import { Product } from "@/hooks/use-items";
import ProductCard from "../menu/ItemCard";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LoadingScreen from "../ui/loadingScreen";
import { useCategory } from "@/hooks/use-category";

interface ICategory {
  _id: string;
  name: string;
  imgURL: string;
}

export const CategoryProductsList = () => {
  const [category, setCategory] = React.useState<ICategory>();
  const [open, setOpen] = React.useState(false);

  const {
    data: products,
    isError,
    isLoading,
  } = useActiveProductsByCategoryId(category ? category._id : "");

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error,
  } = useCategory();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="pt-12 min-h-full">
          <ul className="w-full flex gap-4 px-2 py-4 overflow-x-auto scrollbar-hide">
            {categoriesIsLoading ? (
              <LoadingScreen />
            ) : (
              // categories.map((category, index) => (
              //   <li key={index} className="p-0 flex flex-col">
              //     <div
              //       key={index}
              //       onClick={() => setCategory(category)}
              //       className="min-w-16 flex flex-col gap-2 justify-between items-center rounded-[30px] p-3 shadow-blur bg-white"
              //     >
              //       {category.imgURL && (
              //         <img
              //           className="w-[50px] h-[50px] bg-transparent"
              //           src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${category.imgURL}`}
              //         />
              //       )}
              //       <h6 className="text-text">{category.name}</h6>
              //     </div>
              //   </li>
              // ))
              <div></div>
            )}
          </ul>
        </div>
      </DrawerTrigger>
      <DrawerContent dir="rtl">
        <div className="h-[90vh] pt-2">
          <DrawerHeader>
            <DrawerTitle>{category && category.name}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-6 pb-24 z-2">
            {category === null && categoriesIsLoading ? (
              <LoadingScreen />
            ) : products && products.length > 0 ? (
              products.map((product: Product, index: Key) => {
                return (
                  <ProductCard
                    index={index}
                    product={product}
                    totalProductLength={products.length}
                  />
                );
              })
            ) : (
              <div>
                <h1 className="text-3xl text-center">لا يوجد منتجات</h1>
                <p className="text-center">لا يوجد منتجات في هذا القسم</p>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
