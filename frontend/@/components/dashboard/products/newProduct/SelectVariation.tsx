import { GripVertical, Pen, Trash2 } from "lucide-react";
import AddNewVariant from "./AddNewVariant";
import { useContext, useEffect, useState } from "react";
import { VariationContext } from "@/context/VariationContext";

const SelectedVariation = ({ setVariations }) => {
  const { variations, removeVariation } = useContext(VariationContext);
  const [currentVariant, setCurrentVariant] = useState(null);

  useEffect(() => {
    setVariations(variations);
  }, [variations]);
  return (
    <div className="wrapper w-full flex flex-col gap-2">
      <div className="options w-full flex flex-col gap-2">
        <h6>خيارات</h6>
        {variations.map((variation, index) => (
          <div className="w-full flex justify-between items-center border-y py-4 px-1">
            <span>{variation.title}</span>
            <div className="w-2/4">
              <ul className="flex justify-center items-center gap-2 text-xs text-text">
                {variation
                  ? variation?.options.map((option, index) => (
                      <li
                        key={index}
                        className="p-1 px-3 bg-gray-300 rounded-full"
                      >
                        {option.name}
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
            <div className="w-1/4 flex justify-end items-center gap-4">
              <button onClick={() => removeVariation(index)}>
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentVariant(variation);
                }}
              >
                <Pen className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <AddNewVariant
          currentVariant={currentVariant}
          setCurrentVariant={setCurrentVariant}
        />
      </div>
      <div></div>
    </div>
  );
};

export default SelectedVariation;
