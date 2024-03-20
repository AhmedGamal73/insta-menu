import { Button } from "@/components/ui/button";
import { GripVertical, Menu, Pen, PlusIcon, Trash2 } from "lucide-react";

const SelectedVariation = () => {
  return (
    <div className="wrapper w-full flex flex-col gap-2">
      <div className="options w-full flex flex-col gap-2">
        <h6>خيارات</h6>
        <div className="w-full flex justify-between items-center border-y py-4 px-1">
          <div className="w-1/4 flex justify-start items-center gap-4">
            <GripVertical className="w-5 h-5" />
            <span>اللون</span>
          </div>
          <div className="w-2/4">
            <ul className="flex justify-center items-center gap-2 text-xs text-text">
              <li className="p-1 px-3 bg-gray-300 rounded-full">حمر</li>
              <li className="p-1 px-3 bg-gray-300 rounded-full">خضر</li>
              <li className="p-1 px-3 bg-gray-300 rounded-full">زرق</li>
            </ul>
          </div>
          <div className="w-1/4 flex justify-end items-center gap-4">
            <Pen className="w-4 h-4" />
            <Trash2 className="w-4 h-4" />
          </div>
        </div>
        <Button variant="link" className="w-full flex justify-start">
          <PlusIcon className="w-4 h-4" />
          <span>اضف خياراً اخر</span>
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default SelectedVariation;
