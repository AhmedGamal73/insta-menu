import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import useTable from "@/hooks/use-table";
import { RocketIcon } from "lucide-react";
import { columns } from "@/components/dashboard/restaurant/TablesColumns";

const Tables = () => {
  const { data, status } = useTable();

  return (
    <>
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
