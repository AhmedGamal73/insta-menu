import React, { useContext, useEffect, useState } from "react";

import { useCategory } from "@/hooks/use-category";
import BackButton from "@/components/menu/BackButton";
import Slider from "@/components/Slider";
import { ProductsList } from "@/components/menu/ProductsList";
import { ModalContext } from "@/context";
import Layout from "./Layout";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categoryData } = useCategory();

  const modalContext = useContext(ModalContext);
  useEffect(() => {
    if (modalContext) {
      console.log("modalContext", modalContext.isModalOpen);
    }
  }, [modalContext?.isModalOpen]);

  return (
    <CartProvider>
      <Layout>
        <div className="flex flex-col w-1/1" dir="rtl">
          <div className="flex flex-col p-4 h-52 bg-menu-hero bg-center bg-cover bg-no-repeat">
            {<BackButton />}
          </div>
          <div className="flex mt-[-2rem] bg-white flex-col gap-8 pt-6 rounded-[20px]">
            <Slider
              data={categoryData}
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
            />

            <ProductsList selectedCategory={selectedCategory} />
          </div>
        </div>
        <Toaster />
      </Layout>
    </CartProvider>
  );
};

export default Menu;
