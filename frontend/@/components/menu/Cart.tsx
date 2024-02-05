import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Cookies from "js-cookie";

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
import { CustomerInfoModal } from "./CustomerInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "../ui/use-toast";

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
  const [newCustomer, setNewCustomer] = React.useState(false);
  const { cart, removeItem, total } = useCart();
  const overallTotal = total + Math.round(total * 0.14);

  const checkUserInfo = () => {
    const userInfo = Cookies.get("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  const handleSubmit = () => {
    console.log("Order Submitted");
  };

  const handleFormSubmit = () => {};

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

  React.useEffect(() => {
    const userInfo = checkUserInfo();
    if (userInfo) {
      console.log("userInfo", userInfo);
    } else {
      setNewCustomer(true);
    }
  });
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
            {cart.length === 0 ? (
              <Button disabled>تأكيد الطلب</Button>
            ) : newCustomer ? (
              <CustomerInfoModal onFormSubmit={handleFormSubmit} />
            ) : (
              <Button onClick={handleSubmit}>تأكيد الطلب</Button>
            )}
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">تأكيد الطلب</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
