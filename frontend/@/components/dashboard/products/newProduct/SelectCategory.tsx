import * as React from "react";
import { useRef, useState } from "react";
import { useCategory, useSubcategories } from "@/hooks/use-category";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddNewCategory from "./AddNewCategory";
import AddNewSubcategory from "./AddNewSubcategory";

export function SelectCategory({ onCategorySelect, onSubcategorySelect }) {
  const [selectedCategoryId, setSelectedCategory] = useState("");
  const selectedSubcategoryIdRef = useRef("");

  const { data: categories } = useCategory();
  const { data: subcategories } = useSubcategories(selectedCategoryId);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e);
    onCategorySelect(e);
  };

  const handleSubcategoryChange = (e) => {
    selectedSubcategoryIdRef.current = e;
    onSubcategorySelect(selectedSubcategoryIdRef.current);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-2">
        <Select onValueChange={(value) => handleCategoryChange(value)}>
          <SelectTrigger className="w-11/12">
            <SelectValue placeholder="إختر التصنيف" />
          </SelectTrigger>
          <SelectContent>
            {categories &&
              categories.map((category) => (
                <SelectItem value={category._id}>{category.name}</SelectItem>
              ))}
          </SelectContent>
        </Select>

        <AddNewCategory />
      </div>

      <div className="w-full flex gap-2">
        <Select onValueChange={(value) => handleSubcategoryChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                subcategories && subcategories.length > 0
                  ? "إختير التصنيف الفرعي"
                  : "لا يوجد تصنيف فرعي"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {subcategories && subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <SelectItem value={subcategory._id}>
                  {subcategory.name}
                </SelectItem>
              ))
            ) : (
              <span className="text-xs text-center"> لا يوجد تصنيف فرعي</span>
            )}
          </SelectContent>
        </Select>

        <AddNewSubcategory selectedCategoryId={selectedCategoryId} />
      </div>
    </div>
  );
}
