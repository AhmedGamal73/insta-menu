import React, { useState } from "react";
import { useRouter } from "next/router";

import Slider from "@/components/menu/Slider";
import { ItemsList } from "@/components/menu/ItemList";
import { useGetActiveItems, useGetItems } from "@/hooks/use-items";
import { useGetRestaurantCategories } from "@/hooks/use-restaurant";
import { useTenantContext } from "@/context/tenant-context";
import { useGetBranchById } from "@/hooks/use-branch";
import { BranchLayout } from "@/components/layouts";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();
  const { branchId } = router.query; // This gets the branchId from URL query
  const { currentTenant } = useTenantContext();

  // Fetch branch data if branchId exists
  const { data: branch, isLoading: branchLoading } = useGetBranchById(
    branchId as string
  );

  // Get active branch items
  const { data: activeItems, isLoading: productsLoading } = useGetActiveItems(
    branchId as string
  );

  const { data: categories, isLoading: categoriesLoading } =
    useGetRestaurantCategories(currentTenant?.slug || "");

  // Handle loading states
  if (
    !router.isReady ||
    branchLoading ||
    productsLoading ||
    categoriesLoading
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Filter products by category if needed
  const filteredProducts =
    selectedCategory === "all"
      ? activeItems
      : activeItems?.filter(
          (product) => product.categoryId === selectedCategory
        );

  return (
    <BranchLayout
      title={`قائمة طعام ${
        currentTenant ? `- ${currentTenant.businessName}` : ""
      }`}
    >
      <div className="flex flex-col w-1/1" dir="rtl">
        <div
          style={{ backgroundImage: `url(${currentTenant?.logo})` }}
          className="flex flex-col p-4 h-52 bg-center bg-cover bg-no-repeat image"
        ></div>
        <div className="flex mt-[-2rem] bg-white flex-col gap-4 pt-6 rounded-[20px]">
          {branch && (
            <div className="px-4 py-2 bg-gray-50 rounded-lg mx-4">
              <h2 className="font-bold text-lg">{branch.name}</h2>
              {branch.address && (
                <p className="text-sm text-gray-600">{branch.address}</p>
              )}
            </div>
          )}
          <Slider
            data={categories}
            selectedItem={selectedCategory}
            setSelectedItem={setSelectedCategory}
          />
          <ItemsList data={filteredProducts} isLoading={productsLoading} />
        </div>
      </div>
    </BranchLayout>
  );
};

export default Menu;
