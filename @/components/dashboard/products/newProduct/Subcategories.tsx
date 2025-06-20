import { SelectItem } from "@/components/ui/select";
import { getSubcategories, useSubcategories } from "@/hooks/use-category";
import { useEffect } from "react";

type SubcategoriesProps = {
  selectedCategoryId: string;
};

const Subcategories = ({ selectedCategoryId }: SubcategoriesProps) => {
  const { data: subcategories } = useSubcategories(selectedCategoryId);

  interface Subcategory {
    _id: string;
    name: string;
  }

  return (
    subcategories &&
    subcategories.map((subcategory: Subcategory) => (
      <SelectItem key={subcategory._id} value={subcategory._id}>
        {subcategory.name}
      </SelectItem>
    ))
  );
};

export default Subcategories;
