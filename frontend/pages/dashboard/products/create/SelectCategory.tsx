import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory, useSubcategories } from "@/hooks/use-category";
import { useRef, useState } from "react";

export function SelectCategory({ onCategorySelect, onSubcategorySelect }) {
  const [selectedCategoryId, setSelectedCategory] = useState("");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
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
    <div className="flex flex-col gap-4">
      <Select onValueChange={(value) => handleCategoryChange(value)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="إختر التصنيف" />
        </SelectTrigger>
        <SelectContent>
          {categories &&
            categories.map((category) => (
              <SelectItem value={category._id}>{category.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      {selectedCategoryId === "" ? (
        ""
      ) : (
        <Select onValueChange={(value) => handleSubcategoryChange(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue
              placeholder={
                subcategories && subcategories.length > 0
                  ? "إختير التصنيف الفرعي"
                  : "لا يوجد تصنيف فرعي"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {subcategories && subcategories.length > 0
              ? subcategories.map((subcategory) => (
                  <SelectItem value={subcategory._id}>
                    {subcategory.name}
                  </SelectItem>
                ))
              : " لا يوجد تصنيف فرعي"}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
