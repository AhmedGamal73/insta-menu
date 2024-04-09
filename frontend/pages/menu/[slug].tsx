import React, { useContext, useEffect, useState } from "react";

import { useCategory } from "@/hooks/use-category";
import Slider from "@/components/menu/Slider";
import { ProductsList } from "@/components/menu/ProductsList";
import { ModalContext } from "@/context";
import Layout from "./Layout";
import { useRouter } from "next/router";
import { useGetProductByRestaurant } from "@/hooks/use-product";
import {
  useGetRestaurant,
  useGetRestaurantCategories,
} from "@/hooks/use-restaurant";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all" as string);
  const router = useRouter();
  // const { tableNo } = router.query;
  const { slug } = router.query;

  const { data: restaurant, isLoading: restaurantLoading } = useGetRestaurant(
    slug ? slug.toString() : ""
  );

  const { data: restaurantProducts, isLoading } = useGetProductByRestaurant(
    slug ? slug.toString() : "",
    selectedCategory ? selectedCategory : "all"
  );
  const { data: restaurantCategories } = useGetRestaurantCategories(
    slug ? slug.toString() : ""
  );

  // function setTableNo(key: string, value: string, expirationMinuts: number) {
  //   const now = new Data();
  //   const expirationTime = expirationMinuts * 60 * 1000;
  //   const item = {
  //     value: value,
  //     expiry: now.getTime() + expirationTime,
  //   };
  //   localStorage.setItem(key, JSON.stringify(item));
  // }

  // useEffect(() => {
  //   if (tableNo) {
  //     setTableNo(tableNo, tableNo, 60);
  //   }
  // }, []);

  const modalContext = useContext(ModalContext);

  useEffect(() => {
    // Get tableId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");

    if (tableId) {
      console.log("tableId", tableId);
    }
  }, []);

  return (
    <Layout title={`قائمة طعام ${restaurant?.title}`}>
      <div className="flex flex-col w-1/1" dir="rtl">
        <div
          style={{ backgroundImage: `url(${restaurant?.bgImg})` }}
          className="flex flex-col p-4 h-52 bg-center bg-cover bg-no-repeat image"
        ></div>
        <div className="flex mt-[-2rem] bg-white flex-col gap-4 pt-6 rounded-[20px]">
          <Slider
            data={restaurantCategories}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
          />
          <ProductsList data={restaurantProducts} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
