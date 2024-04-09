"use client";

import { useRouter } from "next/router";
import { Pen, Trash2, ScrollText, MailMinus, Phone } from "lucide-react";

import Layout from "@/components/dashboard/layout";
import { useGetOrder } from "@/hooks/use-order";
import { useGetCustomerById } from "@/hooks/use-customer";
import { Badge } from "@/components/ui/badge";
import variables from "@/config/variables";
import InnerPageHeader from "@/components/ui/inner-page-header";
import { Button } from "@/components/ui/button";
import Box from "@/components/ui/Box";
import CartItemHeader from "@/components/dashboard/orders/CartItemHeader";
import { useGetCartById } from "@/hooks/use-cart";
import { useGetProductById } from "@/hooks/use-product";

const OrderPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const stringId = id as string;
  const { data: orderData, isLoading: isLoadingOrder } = useGetOrder(stringId);
  const { data: customerData, isLoading: isLoadingCustomer } =
    useGetCustomerById(orderData?.customerId as string);

  const cartResult = useGetCartById(orderData?.cart?.[0].toString());
  const productResult = useGetProductById(
    cartResult?.data?.items[0]?.productId.toString()
  );

  if (
    isLoadingOrder ||
    isLoadingCustomer ||
    cartResult.isLoading
    // productResult.isLoading
  )
    return <div>loading...</div>;
  if (isLoadingOrder || isLoadingCustomer) return <div>loading...</div>;

  const cartData = cartResult.data;
  const productData = productResult.data;

  return (
    <Layout title="الطلب" desc={`طلب رقم  ${orderData.orderNo}`}>
      <div className=" w-full px-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col gap-4 py-4">
          <InnerPageHeader href="/dashboard/orders">
            <Button
              variant="outline"
              className=" flex gap-1 text-black bg-gray-100 hover:bg-white text-sm"
            >
              تعديل
              <Pen className="w-3 h-3" />
            </Button>
            <Button
              variant="link"
              className="flex gap-1 text-red-500 text-sm hover:decoration-0"
            >
              حذف
              <Trash2 className="w-3 h-3 " />
            </Button>
          </InnerPageHeader>
          <div className="w-full flex gap-4">
            <Box
              dataClassName="flex flex-col gap-4"
              title="تفاصيل الطلب"
              className="w-3/4"
            >
              <div className="w-full flex gap-2">
                <Badge variant="secondary">
                  {variables.ar.orderStatus[orderData.orderStatus]}
                </Badge>

                {orderData.orderStatus === "Indoor" ? (
                  <Badge variant="outline">{orderData.tableNo}</Badge>
                ) : (
                  ""
                )}

                <Badge variant="outline">
                  {variables.ar.orderType[orderData.orderType]}
                </Badge>
              </div>
              <div className="w-full">
                <div className="items w-full">
                  <CartItemHeader />
                </div>
              </div>
              <div className="w-full">
                <div className="productCard w-full flex flex-col gap-4 justify-between items-center rounded-lg bg-gray-50 py-2">
                  {cartData?.items.map((item, index) => (
                    <div className="w-full flex">
                      <div className="w-4/12 flex gap-2">
                        <img
                          src="/img/products/turkish-coffe.webp"
                          className="w-[50px] h-[50px] rounded-lg"
                        />
                        <div className="flex gap-2">
                          <span>{productData && productData.name}</span>
                          <span></span>
                        </div>
                      </div>

                      <div className="w-2/12 flex flex-col justify-center items-center">
                        {item.addons.length !== 0 ? (
                          item.addons.map((addon, index) => (
                            <div className="w-full flex justify-center items-center gap-1">
                              <span className="font-rubikBold">
                                {addon.name}
                              </span>
                              <div>
                                <span>{addon.price} </span>
                                <span>{variables.curancy.egp} </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span>لا يوجد</span>
                        )}
                      </div>

                      <div className="quantaity w-2/12 flex justify-center items-center">
                        <span>{item.quantity}</span>
                      </div>

                      <div className="w-2/12 flex flex-col justify-center items-center">
                        <span
                          className={
                            item.price > item.priceAtTheTime
                              ? "line-through"
                              : ""
                          }
                        >
                          {item.price}
                        </span>
                        {item.priceAtTheTime !== item.price ? (
                          <span>{item.priceAtTheTime}</span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="quantaity w-2/12 flex justify-center items-center">
                        <span>{item.priceAtTheTime * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Box>
            <Box
              title="بيانات العميل"
              className="w-1/4"
              dataClassName="w-full flex flex-col gap-2"
            >
              <span>{customerData.name}</span>
              <br className="w-full text-text" />
              <p className="w-full text-sm flex gap-1">
                <ScrollText className="w-6 h-4" />
                <span>{customerData.orders.length}</span>
                طلب
              </p>
              <div>
                <h6>بيانات التواصل</h6>
                <p className="w-full flex gap-1">
                  <Phone />
                  {customerData.phone}
                </p>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
