import { useRouter } from "next/router";

import OrderItems from "@/components/dashboard/orders/edit/OrderItems";
import InnerPageHeader from "@/components/ui/inner-page-header";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/hooks/use-order";
import { ClientDataForm } from "@/components/dashboard/orders/edit/ClientDataDialog";

const EditOrder = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetOrder(id as string);

  return (
    <div dir="rtl" className="w-full p-4">
      <div className="min-h-screen w-full flex justify-between items-start gap-4">
        <div className="w-1/12 px-1 flex relative flex-col items-center mt-6 h-[70vh] justify-start rounded-lg bg-gray-200">
          <ul className="flex flex-col gap-4 py-8">
            <li className="flex flex-col justify-center items-center py-2 px-1 rounded-lg">
              <ClientDataForm orderData={data} isLoading={isLoading} id={id} />
            </li>

            <li className="flex flex-col justify-center items-center py-2 px-1 rounded-lg"></li>
          </ul>
        </div>
        <div className="w-11/12 min-h-screen flex flex-col justify-start items-start gap-4 p-1 py-6 transition-all duration-500">
          <InnerPageHeader href="/dashboard/orders">
            <Button type="submit" className="bg-green-500 text-white">
              الموافقة على الطلب
            </Button>
            <Button variant="destructive"> حذف الطلب</Button>
          </InnerPageHeader>
          <OrderItems
            isLoading={isLoading}
            orderItems={data}
            className="shadow-md rounded-md p-2 min-h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
