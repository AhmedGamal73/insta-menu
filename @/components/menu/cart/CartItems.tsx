import { CartProvider, useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { toast } from "../../ui/use-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Item } from "@/components/menu/cart/Cart";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const CartItems = () => {
  const {
    cart,
    setCart,
    setSubtotal,
    setVat,
    removeItem,
    setQuantity,
    quantity,
  } = useCart();

  const handleRemoveItem = (index: number) => {
    removeItem(index);
    toast({
      variant: "destructive",
      description: `تم حذف ${cart[index].product.name} من السلة`,
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
      setSubtotal(parsedTotal);
    }
    const savedVat = Cookies.get("vat");
    if (savedVat) {
      const parsedVat = JSON.parse(savedVat);
      setVat(parsedVat);
    }
    const savedQuantity = Cookies.get("quantity");
    if (savedQuantity) {
      const parsedQuantity = JSON.parse(savedQuantity);
      setQuantity(parsedQuantity);
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
          {quantity === 0 ? (
            <div className="w-full text-center">
              <span>السلة فارغة</span>
            </div>
          ) : quantity > 0 ? (
            cart.map((item: Item, index: number) => (
              <CSSTransition key={index} timeout={300} classNames="item">
                <div
                  key={index}
                  className={`flex justify-between items-center border-slate-200 py-3 px-4 ${
                    index === cart.length - 1 ? "" : "border-b"
                  }`}
                >
                  <div className="w-1/12">
                    <X
                      onClick={() => handleRemoveItem(index)}
                      className="me-2 text-red-500 w-4 h-4"
                    />
                  </div>
                  <div className="w-7/12 flex justify-start flex-col items-center gap-2">
                    <div className="w-full flex justify-center gap-1">
                      <div className="flex items-center justify-start gap-1">
                        <span className=" text-black ps-1 text-sm">
                          {"x" + item.quantity}
                        </span>
                        <h6 className="">{item.product?.name}</h6>
                      </div>
                      <p className="flex items-center">
                        {item.priceAtTheTime ? item.priceAtTheTime : item.price}{" "}
                        <span className="text-[12px]">ج.م</span>
                      </p>
                    </div>
                    {item.addons.length > 0
                      ? item.addons.map((addon) => (
                          <div className="w-full flex justify-center gap-1 flex-wrap">
                            <div className="flex flex-col gap-1 text-xs">
                              <div className="border rounded-full flex justify-center items-center p-1">
                                +<span>{addon.name}</span>
                                <span>{addon.price}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  <div className="w-4/12 justify-end flex gap-1">
                    <p className="">
                      إجمالي: {item.total}{" "}
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
