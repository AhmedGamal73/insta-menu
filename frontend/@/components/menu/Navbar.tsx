import { useCart } from "@/context/CartContext";
import { Gift, Home, Pizza, ScrollText, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Cart } from "./Cart";

const Navbar = () => {
  const { cart } = useCart();
  const [vibrate, setVibrate] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setVibrate(true);
    setTimeout(() => {
      setVibrate(false);
    }, 1000);
  }, [cart]);

  return (
    <div>
      <div className="w-full pb-1 px-3 flex insert-x-0 bottom-2 fixed items-center justify-center">
        <div className="w-full flex justify-between items-center gap-4 p-4 shadow-3xl shadow-warning/80 backdrop-blur bg-secondary/30 rounded-[20px]">
          <div className="flex flex-col items-center gap-1">
            <Pizza className="w-[22px] h-[22px]" />
            <span className="text-sm"> الطعام</span>
          </div>
          <Cart />
          <div className="flex flex-col items-center gap-1">
            <ScrollText className="w-[22px] h-[22px] text-text" />
            <span className="text-sm text-text">طلباتي</span>
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
