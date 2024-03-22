import { createContext, useContext, useState } from "react";

type option = {
  name: string;
  price: number;
  salePrice: number;
};

type variant = {
  title: string;
  options: option[];
};

export const VariationContext = createContext<
  | undefined
  | {
      variations: variant[];
      setVariations: React.Dispatch<React.SetStateAction<variant[]>>;
      removeVariation: (index: number) => void;
      updateVariant: (title: string, newVariationData: variant) => void;
      removeOption: (optionIndex: number, variantIndex: number) => void;
    }
>(null);

export const VariationProvider = ({ children }) => {
  const [variations, setVariations] = useState<variant[]>([]);

  // Delete a variation from the list
  const removeVariation = (index: number) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
  };

  const removeOption = (optionIndex: number, variantIndex: number) => {
    setVariations((prev) => {
      const newVariations = [...prev];
      newVariations[variantIndex].options.splice(optionIndex, 1);
      return newVariations;
    });
  };
  // Update the variation list
  const updateVariant = (title, newVariationData) => {
    setVariations((prev) => {
      const updatedOneIndex = prev.findIndex((v) => v.title === title);
      prev[updatedOneIndex] = newVariationData;
      return [...prev];
    });
  };

  return (
    <VariationContext.Provider
      value={{
        variations,
        setVariations,
        removeVariation,
        updateVariant,
        removeOption,
      }}
    >
      {children}
    </VariationContext.Provider>
  );
};

export const useVariations = () => useContext(VariationContext);
