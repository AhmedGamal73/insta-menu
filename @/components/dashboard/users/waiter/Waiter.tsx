import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getWaitersByShift,
  useWaiters,
  useWaitersByShift,
} from "@/hooks/use-users";
import LoadingScreen from "@/components/ui/loadingScreen";
import { useState } from "react";

export function Waiter() {
  const [shift, setShift] = useState<string>("all");

  const { data: waiters, isLoading: isLoadingWaiters } = useWaiters();
  const { data: waitersByShift, isLoading: isLoadingWaitersByShift } =
    useWaitersByShift(shift);

  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-2/4 grid-cols-4">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger onClick={() => setShift("Morning")} value="Morning">
            صباحي
          </TabsTrigger>
          <TabsTrigger onClick={() => setShift("Evining")} value="Evening">
            مسائي
          </TabsTrigger>
          <TabsTrigger onClick={() => setShift("Double")} value="Double">
            صباحي و مسائي
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {isLoadingWaiters ? (
            <LoadingScreen />
          ) : !waiters ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable title="كابتن" columns={columns} data={waiters} />
          )}
        </TabsContent>

        <TabsContent value="Morning">
          {isLoadingWaitersByShift ? (
            <LoadingScreen />
          ) : !waitersByShift ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable title="كابتن" columns={columns} data={waitersByShift} />
          )}
        </TabsContent>

        <TabsContent value="Evening">
          {isLoadingWaitersByShift ? (
            <LoadingScreen />
          ) : !waitersByShift ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable title="كابتن" columns={columns} data={waitersByShift} />
          )}
        </TabsContent>

        <TabsContent value="Double">
          {isLoadingWaitersByShift ? (
            <LoadingScreen />
          ) : !waitersByShift ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable title="كابتن" columns={columns} data={waitersByShift} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Waiter;
