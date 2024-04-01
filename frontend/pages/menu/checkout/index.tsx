import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "react-query";

import { useCart } from "@/context/CartContext";
import CartItems from "@/components/menu/cart/CartItems";
import Otp from "@/components/checkout/Otp";
import SmallCart from "@/components/checkout/SmallCart";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import PromoCode from "@/components/checkout/PromoCode";
import Card2 from "@/components/ui/Card2";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useCities, useDistrict } from "@/hooks/use-location";
import { Order, postOrder } from "@/hooks/use-order";
import LoginDialog from "@/components/checkout/LoginDialog";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Cash");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("Takeaway");
  const [promoCode, setPromoCode] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<number>(0);
  const [open, setOpen] = useState<Boolean>(false);
  const [openOtp, setOpenOtp] = useState<Boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { data: cities } = useCities(orderType);
  const { data: districts } = useDistrict(selectedCity);

  const customerToken = Cookies.get("customerToken");
  const tableNo = Cookies.get("tableNo");

  const {
    quantity,
    cart,
    subtotal,
    setSubtotal,
    setCart,
    setVat,
    setQuantity,
  } = useCart();

  // Extra Fees
  const loungeTax = Math.round(subtotal * 0.1);
  const discount = subtotal * promoCode;
  const vat = Math.round(subtotal * 0.14);
  const total =
    orderType == "Indoor"
      ? subtotal + vat + loungeTax
      : orderType == "Delivery"
      ? subtotal + vat + deliveryFee
      : subtotal + vat;

  // zod schema
  const orderFormSchema = z
    .object({
      orderName: z.string().min(3).max(20),
      tableNo: z.number().optional(),
      phoneNumber: z.string().refine(
        (value) => {
          const phoneNumberRegex = /^01\d{9}$/;
          return phoneNumberRegex.test(value);
        },
        {
          message: "يجب ان يكون الرقم 11 رقماً ويبدأ ب 01",
        }
      ),
      orderType: z.string(),
      city: z.string().optional(),
      district: z.string().optional(),
      street: z.string().optional(),
    })
    .refine(
      (data) =>
        data.orderType === "Delivery"
          ? !!data.street || !!data.city || data.district || !!data.street
          : true,
      {
        message: "العنوان مطلوب",
        path: ["address"],
      }
    )
    .refine((data) => (data.orderType === "Indoor" ? !!data.tableNo : true), {
      message: "رقم الطاولة مطلوب",
      path: ["tableNo"],
    });

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderName: "",
      tableNo: tableNo && Number(tableNo),
      orderType:
        orderType === "Delivery"
          ? "Delivery"
          : "Takeaway"
          ? "Takeaway"
          : "Indoor",
      city: "",
      phoneNumber: "",
      district: "",
      street: "",
    },
  });

  const mutation = useMutation(postOrder, {
    onSuccess: (data) => {
      setOpenOtp(true);
    },
    onError: (error: any) => {
      if (error?.response && error?.response.status === 401) {
        setOpen(true);
      }
    },
  });

  let order: Order;
  const onSubmit = async (checkoutData) => {
    setPhoneNumber(checkoutData.phoneNumber);
    order = {
      customerToken: customerToken,
      orderName: checkoutData.orderName,
      tableNo: typeof tableNo === "number" ? tableNo : 0,
      phoneNumber: checkoutData.phoneNumber,
      address: {
        cityName: checkoutData.city,
        districtId: checkoutData.district,
        street: checkoutData.street,
      },
      orderType: orderType,
      quantity: quantity,
      cart: cart,
      subtotal: subtotal,
      total: total,
      discount: discount,
      vat: vat,
      paymentMethod: selectedMethod,
      deliveryFee: orderType === "Delivery" ? deliveryFee : 0,
      deliveryTime: orderType === "Delivery" ? deliveryTime : 0,
      loungeTax: orderType === "Indoor" ? loungeTax : 0,
      promoCode: promoCode,
    };
    const { data } = await mutation.mutateAsync(order);
  };

  useEffect(() => {
    tableNo && orderType === "Indoor";
    console.log(tableNo);
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
    const savedQuantity = Cookies.get("quantity");
    if (savedQuantity) {
      const parsedQuantity = JSON.parse(savedQuantity);
      setQuantity(parsedQuantity);
    }
  }, []);

  return (
    <div
      dir="rtl"
      className="flex flex-col justify-between gap-4 bg-gray-100 pt-[4rem] pb-[5rem]"
    >
      {open && <LoginDialog openDialog={open} onClose={setOpen} />}
      {openOtp && (
        <Otp phoneNumber={phoneNumber} openOtp={openOtp} onClose={setOpenOtp} />
      )}
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Header title="الدفع" />
          <div className="w-full px-2">
            <div className="w-full bg-white flex justify-between">
              <div className="w-full flex flex-col gap-2 bg-gray-100">
                <div className="w-full bg-gray-100 ">
                  <FormField
                    control={form.control}
                    name="orderType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="w-full flex justify-between items-center bg-white rounded-lg py-3 px-4"
                          >
                            <FormItem className="pb-0">
                              <FormControl>
                                <RadioGroupItem value="Delivery" />
                              </FormControl>
                              <FormLabel
                                onClick={() => setOrderType("Delivery")}
                                className={
                                  orderType === "Delivery"
                                    ? "font-normal text-white bg-secondary py-2 px-4 rounded-lg"
                                    : "p-2 py-2 px-4"
                                }
                              >
                                دليفري
                              </FormLabel>
                            </FormItem>

                            <FormItem className="pb-0">
                              <FormControl>
                                <RadioGroupItem value="Takeaway" />
                              </FormControl>
                              <FormLabel
                                onClick={() => setOrderType("Takeaway")}
                                className={
                                  orderType === "Takeaway"
                                    ? "font-normal text-white bg-secondary py-2 px-4 rounded-lg"
                                    : "p-2 py-2 px-4"
                                }
                              >
                                استلام
                              </FormLabel>
                            </FormItem>

                            <FormItem className="pb-0">
                              <FormControl>
                                <RadioGroupItem value="Indoor" />
                              </FormControl>
                              <FormLabel
                                onClick={() => setOrderType("Indoor")}
                                className={
                                  orderType === "Indoor"
                                    ? "font-normal text-white bg-secondary py-2 px-4 rounded-lg"
                                    : "p-2 py-2 px-4"
                                }
                              >
                                صالة
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div dir="rtl" className="p-4 rounded-lg bg-white">
                  <FormField
                    control={form.control}
                    name="orderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">
                          اسم الطلب <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder=" الطلب باسم"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">
                          رقم الهاتف <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="phone"
                            placeholder="رقم للتواصل هاتف او واتساب"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tableNo"
                    render={({ field }) => (
                      <FormItem
                        className={orderType === "Indoor" ? "" : "hidden"}
                      >
                        <FormLabel className="text-xs">رقم الطاولة</FormLabel>
                        <FormControl>
                          <Input placeholder="رقم طاولة الطلب" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem
                        className={orderType !== "Delivery" ? "hidden" : ""}
                      >
                        <FormLabel className="text-xs">
                          المدينة <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedCity(value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المدينة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {cities?.map((city) => {
                                return (
                                  <SelectItem key={city._id} value={city.name}>
                                    {city.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem
                        className={orderType !== "Delivery" ? "hidden" : ""}
                      >
                        <FormLabel className="text-xs">
                          المنطقة <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const district = districts.find(
                              (d) => d._id === value
                            );
                            setDeliveryFee(district.price);
                            setDeliveryTime(district.time);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المنطقة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedCity !== ""
                              ? districts?.map((district) => {
                                  return (
                                    <SelectItem
                                      key={district._id}
                                      value={district._id}
                                    >
                                      {district.name}
                                    </SelectItem>
                                  );
                                })
                              : "اختر المدينة اولا"}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem
                        className={orderType === "Delivery" ? "" : "hidden"}
                      >
                        <FormLabel className="text-xs">الشارع</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="الشارع او اقرب علامة لمكان الإستلام"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                <span>المجموع الفرعي</span>
                <span className="text-black">{subtotal} ج.م</span>
              </div>
              <div className="flex justify-between px-2">
                <span>ضريبة القيمة المضافة</span>
                <span className="text-black">{vat} ج.م</span>
              </div>
              <div className="flex justify-between px-2">
                <span>الخصم</span>
                <span className="text-black">{discount} ج.م</span>
              </div>
              {orderType === "Delivery" && (
                <div>
                  <div className="flex justify-between px-2">
                    <span>التوصيل</span>
                    <span className="text-black">{deliveryFee} ج.م</span>
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
                <span className="text-black font-rubikBold">الإجمالي</span>
                <span className="text-black font-rubikBold">{total} ج.م</span>
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
          <div className="w-full insert-x-0 px-2 fixed bottom-2">
            <div
              dir="rtl"
              className="w-full flex gap-4 px-2 bg-white rounded-lg py-3 z-20 border shadow-md"
            >
              <Button
                disabled={quantity == 0 || total == 0}
                type="submit"
                className="w-1/2 px-4 text-xs rounded py-2"
              >
                الدفع
              </Button>
              <SmallCart
                quantaity={quantity}
                total={total}
                className="pe-1 w-1/2 px-4 text-xs rounded py-2"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutPage;
