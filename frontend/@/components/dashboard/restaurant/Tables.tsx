import CreateUser from "@/components/dashboard/restaurant/CreateUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import useTable from "@/hooks/use-table";
import { RocketIcon } from "lucide-react";
import { columns } from "../../../../pages/dashboard/restaurant/columns";

const Tables = () => {
  const { data, status } = useTable();

  return (
    <>
      <div>
        <CreateUser />
      </div>
      <div>
        {status === "loading" ? (
          "يتم التحميل..."
        ) : status === "error" ? (
          <Alert dir="rtl">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
            <AlertDescription>
              يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع احد
              المهندسين
            </AlertDescription>
          </Alert>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default Tables;
