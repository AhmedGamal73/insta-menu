import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface Item {
  id: string;
  name: string;
  priceAtTheTime: number;
  quantity: number;
  price: number;
  variations: string;
  addons: string[];
}

export function Cart() {
  const { cart, removeItem, total } = useCart();
  const overallTotal = total + Math.round(total * 0.14);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex flex-col items-center gap-1">
          <ShoppingBag className={`text-text w-[22px] h-[22px]`} />
          <span className="text-sm text-text">السلة</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="pb-6">
            <DrawerTitle>السلة</DrawerTitle>
            <DrawerDescription>
              تميز بعروضنا المستمرة علي مدار العام.
            </DrawerDescription>
          </DrawerHeader>
          <div dir="rtl" className="w-full flex flex-col justify-start px-4">
            <div
              dir="rtl"
              className="max-h-52 overflow-y-scroll border border-slate-200 rounded p-4"
            >
              <TransitionGroup component={null}>
                {cart && cart.length === 0 ? (
                  <h6 className="text-center">السلة فارغة</h6>
                ) : cart.length > 0 ? (
                  cart.map((item: Item, index: number) => (
                    <CSSTransition key={index} timeout={300} classNames="item">
                      <div
                        key={index}
                        className={`flex justify-between items-center border-slate-200 py-4 px-2 ${
                          index === cart.length - 1 ? "" : "border-b"
                        }`}
                      >
                        <div className="flex items-center gp-0 justify-start">
                          <X
                            onClick={() => removeItem(index)}
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
            <div className="w-full px-2 pt-6 gap-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h6>المجموع</h6>
                <h6>{total} ج.م</h6>
              </div>
              <div className="flex justify-between items-center">
                <h6>ضريبة القيمة المضافة</h6>
                <h6>{Math.round(total * 0.14)} ج.م</h6>
              </div>
              <div className="flex justify-between items-center border-t-2 pt-2">
                <h6>الإجمالي </h6>
                <h6>{overallTotal} ج.م</h6>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>تأكيد</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
