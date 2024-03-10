import { ShoppingCart } from "lucide-react";

const SmallCart = ({ overall, cart, className }) => {
  return (
    <div
      className={`${className} w-1/2 gap-0 flex justify-end items-center text`}
    >
      <h6 className="w-1/2 text-end">{overall} ج.م</h6>
      <div className="w-1/3 ps-2 flex justify-end relative">
        <span className="py-[2px] px-[6px] text-[12px] rounded-3xl bg-secondary text-white absolute left-4 top-[-5px]">
          {cart?.length - 1}
        </span>
        <ShoppingCart className="w-6 h-6 text-gray-700" />
      </div>
    </div>
  );
};

export default SmallCart;
