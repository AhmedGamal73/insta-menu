import { CartProvider, useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";

import { TransitionGroup, CSSTransition } from "react-transition-group";

export interface Item {
  id: string;
  name: string;
  priceAtTheTime: number;
  quantity: number;
  price: number;
  variations: string;
  addons: string[];
}

const CartItems = () => {
  const { cart, setCart, setTotal, setVat, removeItem } = useCart();

  const handleRemoveItem = (index: number) => {
    removeItem(index);
    toast({
      variant: "destructive",
      description: `تم حذف ${cart[index].name} من السلة`,
      style: {
        justifyContent: "center",
      },
    });
  };

  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
    const savedTotal = Cookies.get("total");
    if (savedTotal) {
      const parsedTotal = JSON.parse(savedTotal);
      setTotal(parsedTotal);
    }
    const savedVat = Cookies.get("vat");
    if (savedVat) {
      const parsedVat = JSON.parse(savedVat);
      setVat(parsedVat);
    }
  }, []);

  return (
    <div
      dir="rtl"
      className="max-h-52 overflow-y-scroll border border-slate-200 rounded-[10px] relative bg-white"
    >
      <div className="w-full z-10 py-2 sticky top-0 bg-gradient-to-t from-white/60 to-white"></div>
      <div className="scrollbar-hide">
        <TransitionGroup component={null}>
          {cart && cart.length == 0 ? (
            <h6 className="text-center">السلة فارغة</h6>
          ) : cart.length > 0 ? (
            cart.map((item: Item, index: number) => (
              <CSSTransition key={index} timeout={300} classNames="item">
                <div
                  key={index}
                  className={`flex justify-between items-center border-slate-200 py-3 px-2 ${
                    index === cart.length - 1 ? "" : "border-b"
                  }`}
                >
                  <div className="flex items-center justify-start">
                    {/* <Pen className="me-1 text-green-500 w-4 h-4" /> */}
                    <X
                      onClick={() => handleRemoveItem(index)}
                      className="me-2 text-red-500 w-4 h-4"
                    />
                    <h6 className="">{item.name}</h6>
                  </div>
                  <div className="flex items-center gap-2 justify-start">
                    <p className="text-[12px]">العدد: {item.quantity}</p>
                    <p className="">
                      السعر: {item.priceAtTheTime}{" "}
                      <span className="text-[12px]">ج.م</span>
                    </p>
                  </div>
                </div>
              </CSSTransition>
            ))
          ) : null}
        </TransitionGroup>
      </div>
      <div className="w-full z-10 py-2 sticky bottom-0 bg-gradient-to-b from-white/20 to-white"></div>
    </div>
  );
};

export default CartItems;
