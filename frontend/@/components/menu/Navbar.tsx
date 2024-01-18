import { Gift, Home, Pizza, ScrollText, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <div className="w-full pb-1 px-3 flex insert-x-0 bottom-2 fixed items-center justify-center">
        <div className="w-full flex justify-between items-center gap-4 p-4 shadow-3xl shadow-warning/80 backdrop-blur bg-secondary/30 rounded-[20px]">
          <div className="flex flex-col items-center gap-1">
            <Pizza className="w-[22px] h-[22px]" />
            <span className="text-sm"> الطعام</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShoppingBag className="text-text w-[22px] h-[22px]" />
            <span className="text-sm text-text">السلة</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ScrollText className="w-[22px] h-[22px] text-text" />
            <span className="text-sm text-text">الطلب</span>
          </div>
          <a className="flex flex-col items-center gap-1 " href="#">
            <Gift className="w-[22px] h-[22px] text-text" />
            <span className="text-sm text-text">العروض</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
