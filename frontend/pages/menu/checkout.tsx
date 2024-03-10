import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import CartItems from "@/components/menu/CartItems";
import SmallCart from "@/components/menu/checkout/SmallCart";
import PaymentMethod from "@/components/menu/checkout/PaymentMethod";
import PromoCode from "@/components/menu/checkout/PromoCode";
import Card2 from "@/components/ui/Card2";
import DeliveryContent from "@/components/menu/checkout/DeliveryContent";
import LoungeContent from "@/components/menu/checkout/LoungeContent";

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");
  const [orderType, setOrderType] = useState<string>("Delivery");
  const [promoCode, setPromoCode] = useState<number>(0);

  const { total, cart } = useCart();

  const tableNo = 33;
  const delivery = 55;
  const loungeTax = total * 0.1;
  const discount = total * promoCode;
  const vat = Math.round(total * 0.14);
  let overall =
    orderType == "Indoor"
      ? total + vat + loungeTax
      : orderType == "Delivery"
      ? total + vat + delivery
      : total + vat;

  const isIndoor = Cookies.get("tableNo");

  useEffect(() => {
    isIndoor ? setOrderType("Indoor") : setOrderType("Delivery");
  }, [orderType]);
  return (
    <div className="flex flex-col justify-between gap-4 bg-gray-100 pt-4 pb-[5rem]">
      <div className="w-full px-2">
        <div className="flex justify-between bg-white p-2 rounded-[10px]">
          <Link href="/menu">
            <ChevronLeft />
          </Link>
          <h6>الدفع</h6>
          <h1></h1>
        </div>
      </div>
      <div className="w-full px-2">
        <div className="flex justify-between">
          <Tabs defaultValue={orderType} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white">
              <TabsTrigger
                aria-selected={orderType === "Indoor"}
                onClick={() => setOrderType("Indoor")}
                value="Indoor"
              >
                {" "}
                صالة
              </TabsTrigger>
              <TabsTrigger
                aria-selected={orderType === "Takeaway"}
                onClick={() => setOrderType("Takeaway")}
                value="Takeaway"
              >
                تاك اواي
              </TabsTrigger>
              <TabsTrigger
                aria-selected={orderType === "Delivery"}
                onClick={() => setOrderType("Delivery")}
                value="Delivery"
              >
                ديلفري
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="Indoor"
              data-state={orderType === "Indoor" ? "active" : "inactive"}
              className="bg-white rounded-[10px] p-4"
            >
              <LoungeContent tableNo={tableNo} />
            </TabsContent>
            <TabsContent
              data-state={orderType === "Takeaway" ? "active" : "inactive"}
              value="Takeaway"
              className="bg-white rounded-[10px] p-4"
            >
              <DeliveryContent />
            </TabsContent>
            <TabsContent
              data-state={orderType === "Delivery" ? "active" : "inactive"}
              value="Delivery"
              className="bg-white rounded-[10px] p-4"
            >
              <DeliveryContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="w-full px-2">
        <CartItems />
      </div>

      <div className="w-full px-2">
        <div
          dir="rtl"
          className="w-full flex flex-col gap-4 text-xs text-gray-500 bg-white rounded-[10px] px-2 py-4"
        >
          <div className="flex justify-between px-2">
            <span>المحموع الفرعي</span>
            <span className="text-black">{total} ج.م</span>
          </div>
          <div className="flex justify-between px-2">
            <span>ضريبة القيمة المضافة</span>
            <span className="text-black">{vat} ج.م</span>
          </div>
          <div className="flex justify-between px-2">
            <span>خصم</span>
            <span className="text-black">{discount} ج.م</span>
          </div>
          {orderType === "Delivery" && (
            <div>
              <div className="flex justify-between px-2">
                <span>التوصيل</span>
                <span className="text-black">{delivery} ج.م</span>
              </div>
            </div>
          )}
          {orderType === "Indoor" && (
            <div>
              <div className="flex justify-between px-2">
                <span>خدمة الصالة</span>
                <span className="text-black">{loungeTax} ج.م</span>
              </div>
            </div>
          )}
          <div className="w-full flex justify-center items-center">
            <hr className="w-full" />
          </div>
          <div className="flex justify-between px-2 ">
            <span className="text-black font-rubikBold">المحموع الكلي</span>
            <span className="text-black font-rubikBold">{overall} ج.م</span>
          </div>
        </div>
      </div>

      <div className="w-full px-2">
        <PromoCode />
      </div>

      <div className="w-full px-2">
        <Card2 className="">
          <PaymentMethod onPaymentChange={setSelectedMethod} />
        </Card2>
      </div>
      <div className="w-full flex flex-col gap-4 bg-white p-3 rounded-[10px] fixed bottom-0 z-20 shadow-xl">
        <div dir="rtl" className="flex gap-4">
          <button className="w-1/2 px-4 text-xs bg-secondary text-white rounded py-2">
            الدفع
          </button>
          <SmallCart cart={cart} overall={overall} className="pe-1" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
