import React, { useContext, useEffect, useState } from "react";

import { useCategory } from "@/hooks/use-category";
import Slider from "@/components/Slider";
import { ProductsList } from "@/components/menu/ProductsList";
import { ModalContext } from "@/context";
import Layout from "./Layout";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/menu/Navbar";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categoryData } = useCategory();

  const modalContext = useContext(ModalContext);
  useEffect(() => {
    if (modalContext) {
      console.log("modalContext", modalContext.isModalOpen);
    }
  }, [modalContext?.isModalOpen]);
  useEffect(() => {
    // Get tableId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("tableId");

    if (tableId) {
      console.log("tableId", tableId);
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col w-1/1" dir="rtl">
        <div className="flex flex-col p-4 h-52 bg-menu-hero bg-center bg-cover bg-no-repeat"></div>
        <div className="flex mt-[-2rem] bg-white flex-col gap-4 pt-6 rounded-[20px]">
          <Slider
            data={categoryData}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
          />
          <Navbar />
          <ProductsList selectedCategory={selectedCategory} />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Menu;
