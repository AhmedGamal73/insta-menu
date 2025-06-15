import React, { useContext, useEffect } from "react";

import Slider from "@/components/menu/Slider";
import { ProductsList } from "@/components/menu/ProductsList";
import { ModalContext } from "@/context";
import Layout from "./Layout";
import useProduct from "@/hooks/use-product";

const Menu = () => {
  const { data: products, isLoading } = useProduct();
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    // Get tableId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");

    if (tableId) {
      console.log("tableId", tableId);
    }
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (!products) return <div>No products found</div>;

  return (
    // <Layout title={`قائمة طعام ${restaurant?.title}`}>
    <Layout title={`قائمة طعام test`}>
      <div className="flex flex-col w-1/1" dir="rtl">
        <div
          // style={{ backgroundImage: `url(${restaurant?.bgImg})` }}
          className="flex flex-col p-4 h-52 bg-center bg-cover bg-no-repeat image"
        ></div>
        <div className="flex mt-[-2rem] bg-white flex-col gap-4 pt-6 rounded-[20px]">
          {/* <Slider
            data={restaurantCategories}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
          /> */}
          <ProductsList data={products} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default Menu;
