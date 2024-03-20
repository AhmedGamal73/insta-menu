import { useCart } from "@/context/CartContext";
import {
  Gift,
  MessageCircleMore,
  Pizza,
  ScrollText,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Cart } from "./menu/cart/Cart";

const Navbar = () => {
  // const [cart, setCart] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const { cart } = useCart();
  //     setCart(cart);
  //   }
  // }, []);

  return (
    <div>
      <div className="w-full pb-1 px-3 flex insert-x-0 bottom-2 fixed items-center justify-center">
        <div className="w-full flex justify-between items-center gap-4 py-3 px-4 shadow-3xl shadow-warning/80  bg-white rounded-[20px]">
          <div className="flex flex-col items-center gap-1">
            <Pizza className="w-[20px] h-[20px]" />
            <span className="text-xs font-rubikBold"> الطعام</span>
          </div>
          <Cart />
          <div className="flex flex-col items-center gap-1">
            <UserRound className="w-[22px] h-[22px] text-text" />
            <span className="text-xs text-text">حسابي</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MessageCircleMore className="w-[22px] h-[22px] text-text" />
            <span className="text-xs text-text">راسلنا</span>
          </div>
          <a className="flex flex-col items-center gap-1 " href="#">
            <Gift className="w-[20px] h-[20px] text-text" />
            <span className="text-xs text-text">العروض</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
