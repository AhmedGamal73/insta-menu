import { useEffect, useState } from "react";
import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeliveryOrders,
  useIndoorOrders,
  useOrders,
  useTakeawayOrders,
} from "@/hooks/use-order";
import LoadingScreen from "@/components/ui/loadingScreen";

export function Orders() {
  const { data: orders, status: ordersIsLoading } = useOrders();
  const { data: deliveryOrders, isLoading: deliveryIsLoading } =
    useDeliveryOrders();

  const { data: takeawayOrders, isLoading: takeawayIsLoading } =
    useTakeawayOrders();

  const { data: indoorOrders, isLoading: indoorIsLoading } = useIndoorOrders();

  const [loadingScreen, setLoadingScreen] = useState(false);

  useEffect(() => {
    if (
      ordersIsLoading === "loading" ||
      deliveryIsLoading ||
      takeawayIsLoading ||
      indoorIsLoading
    ) {
      setLoadingScreen(true);
    } else {
      setLoadingScreen(false);
    }
  }, [ordersIsLoading, deliveryIsLoading, takeawayIsLoading, indoorIsLoading]);

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-2/4 grid-cols-4">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="delivery">توصيل</TabsTrigger>
          <TabsTrigger value="takeaway">استلام</TabsTrigger>
          <TabsTrigger value="indoor">صالة</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div>
            {loadingScreen ? (
              <LoadingScreen />
            ) : orders ? (
              <DataTable title="طلب" columns={columns} data={orders} />
            ) : (
              <Alert dir="rtl">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
                <AlertDescription>
                  يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                  احد المهندسين
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
        <TabsContent value="delivery">
          <div>
            {loadingScreen ? (
              <LoadingScreen />
            ) : deliveryOrders ? (
              <DataTable title="طلب" columns={columns} data={deliveryOrders} />
            ) : (
              <Alert dir="rtl">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
                <AlertDescription>
                  يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                  احد المهندسين
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        <TabsContent value="takeaway">
          <div>
            {loadingScreen ? (
              <LoadingScreen />
            ) : takeawayOrders ? (
              <DataTable title="طلب" columns={columns} data={takeawayOrders} />
            ) : (
              <Alert dir="rtl">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
                <AlertDescription>
                  يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                  احد المهندسين
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        <TabsContent value="indoor">
          <div>
            {loadingScreen ? (
              <LoadingScreen />
            ) : indoorOrders ? (
              <DataTable title="طلب" columns={columns} data={indoorOrders} />
            ) : (
              <Alert dir="rtl">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
                <AlertDescription>
                  يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                  احد المهندسين
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Orders;
