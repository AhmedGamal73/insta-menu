import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import LoadingScreen from "@/components/ui/loadingScreen";
import { useGetOrder } from "@/hooks/use-order";

export function OrderItems({ orderItems, isLoading, className }) {
  return (
    <div className={`w-full flex gap-8 ${className}`}>
      {isLoading && <LoadingScreen />}
      <div className="w-full flex gap-4">
        {orderItems ? (
          <DataTable
            title="طاولة"
            columns={columns}
            data={orderItems.cart.items}
          />
        ) : (
          <Alert dir="rtl">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
            <AlertDescription>
              يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع احد
              المهندسين
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default OrderItems;
