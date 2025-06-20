import { AlignJustify, X } from "lucide-react";
import { useState } from "react";

const OffCanvas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOffCanvas = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <button
        className=" z-10 text-black p-2 rounded"
        onClick={toggleOffCanvas}
      >
        <AlignJustify />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-full translate-x-0" : "w-[0%] -translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-3 py-3">
          <h3>Hello</h3>
          <button
            className="w-fit flex justify-end items-center"
            onClick={toggleOffCanvas}
          >
            <X />
          </button>
        </div>
        <h2 className="text-white text-xl p-4">Off-Canvas Content</h2>
        <p className="text-white p-4">This is the off-canvas content.</p>
      </div>
    </div>
  );
};

export default OffCanvas;
