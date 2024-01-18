import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import useProduct from "@/hooks/use-product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import Layout from "../layout";

function Products() {
  const { data, status } = useProduct();

  return (
    <Layout
      title="المنتجات"
      desc="يمكنك إضافة منتجك الخاص وتخصيص جميع معلوماته"
    >
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
    </Layout>
  );
}

export default Products;
