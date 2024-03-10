import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAddonsByCategory,
  useGetAddonsCategories,
} from "@/hooks/use-addon";

export function SelectAddon({ onSelectedAddonsChange }) {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedAddons, setSelectedAddons] = React.useState([]);

  const { data: addonsCategories } = useGetAddonsCategories();
  const { data: addons } = useGetAddonsByCategory(selectedCategory);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedAddons((selectedAddons) => [
        ...selectedAddons,
        e.target.value,
      ]);
    } else {
      setSelectedAddons(
        selectedAddons.filter((addon) => addon !== e.target.value)
      );
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e);
  };

  React.useEffect(() => {
    onSelectedAddonsChange(selectedAddons, selectedCategory);
    console.log(selectedCategory);
  }, [selectedAddons, selectedCategory]);
  return (
    <Select
      onValueChange={(e) => {
        handleCategoryChange(e);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="إختر تصنيف الإضافة" />
      </SelectTrigger>
      <SelectContent>
        {addonsCategories &&
          addonsCategories.length > 0 &&
          addonsCategories.map((category, index) => (
            <SelectItem value={category._id} key={index}>
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
      <div className="w-full flex gap-4 py-2 px-4 mt-2 mb-4 rounded-lg border">
        {addons && addons.length > 0 ? (
          addons.map((addon, index) => (
            <label
              key={addon._id}
              className="flex justify-start items-center gap-2 hover:bg-slate-50 px-4 py-2 rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                value={addon._id}
                checked={selectedAddons.includes(addon._id) ? true : false}
                onChange={handleCheckboxChange}
              />
              <p>{addon.name}</p>
            </label>
          ))
        ) : (
          <p className="text-primary py-2">لا يوجد إضافات لهذا التصنيف</p>
        )}
      </div>
    </Select>
  );
}
