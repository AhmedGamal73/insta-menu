import { ShoppingCart } from "lucide-react";

const SmallCart = ({ total, quantaity, className }) => {
  return (
    <div
      className={`${className} w-1/2 gap-0 flex justify-end items-center text`}
    >
      <h6 className="w-1/2 text-end">{total} ج.م</h6>
      <div className="w-1/3 ps-2 flex justify-end relative">
        <span className="py-[2px] px-[8px] text-[12px] rounded-3xl bg-secondary text-white absolute left-3 top-[-8px]">
          {quantaity}
        </span>
        <ShoppingCart className="w-5 h-5 text-gray-700" />
      </div>
    </div>
  );
};

export default SmallCart;
