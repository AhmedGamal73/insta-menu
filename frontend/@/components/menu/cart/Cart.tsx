import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

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
import { CustomerInfoModal } from "../CustomerInfo";
import { toast } from "../../ui/use-toast";
import Link from "next/link";
import CartItems from "./CartItems";

interface Addon {
  _id: string;
  name: string;
  price: number;
}

export interface Item {
  productId: string;
  name: string;
  quantity: number;
  priceAtTheTime: number;
  price: number;
  total: number;
  variations: object;
  addons: Addon[];
}

export function Cart() {
  const [newCustomer, setNewCustomer] = React.useState(true);
  const {
    cart,
    removeItem,
    subtotal,
    setCart,
    setSubtotal,
    setVat,
    vat,
    quantity,
  } = useCart();
  const total = subtotal + Math.round(subtotal * 0.14);

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

  const customerToken = Cookies.get("customerToken");
  const token = customerToken ? jwt.decode(customerToken) : null;
  React.useEffect(() => {
    if (token === null) {
      setNewCustomer(true);
    } else {
      setNewCustomer(false);
    }
  }, [token]);

  React.useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
    const savedSubtotal = Cookies.get("subtotal");
    if (savedSubtotal) {
      const parsedSubtotal = JSON.parse(savedSubtotal);
      setSubtotal(parsedSubtotal);
    }
    const savedVat = Cookies.get("vat");
    if (savedVat) {
      const parsedVat = JSON.parse(savedVat);
      setVat(parsedVat);
    }
  }, []);

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
            <CartItems />
            <div className="w-full px-2 pt-6 gap-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h6>المجموع</h6>
                <h6>{subtotal} ج.م</h6>
              </div>
              <div className="flex justify-between items-center">
                <h6>ضريبة القيمة المضافة</h6>
                <h6>{Math.round(subtotal * 0.14)} ج.م</h6>
              </div>
              <div className="flex justify-between items-center border-t-2 pt-2">
                <h6>الإجمالي </h6>
                <h6>{total} ج.م</h6>
              </div>
            </div>
          </div>
          <DrawerFooter>
            {quantity === 0 ? (
              <Button disabled>الدفع</Button>
            ) : newCustomer == false ? (
              <Button asChild>
                <Link href="/menu/checkout">الدفع</Link>
              </Button>
            ) : (
              <CustomerInfoModal onFormSubmit={handleFormSubmit} />
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
