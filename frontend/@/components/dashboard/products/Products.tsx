import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { RocketIcon } from "lucide-react";
import { columns } from "./columns";
import useProduct, {
  useActiveProducts,
  useInActiveProducts,
} from "@/hooks/use-product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "@/components/ui/spinner";

export function Products() {
  const { data: allProducts, status } = useProduct();
  const {
    data: activeProducts,
    status: activeStatus,
    isLoading,
  } = useActiveProducts();
  const { data: inActiveProducts, status: inActiveStatus } =
    useInActiveProducts();
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-2/4 grid-cols-3">
        <TabsTrigger value="all">الكل</TabsTrigger>
        <TabsTrigger value="active">الفعال</TabsTrigger>
        <TabsTrigger value="inactive">غير فعال</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div>
          {status === "loading" ? (
            "يتم التحميل..."
          ) : status === "error" ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable columns={columns} data={allProducts} />
          )}
        </div>
      </TabsContent>
      <TabsContent value="active">
        <div>
          {isLoading ? (
            <Spinner />
          ) : activeStatus === "error" ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable columns={columns} data={activeProducts} />
          )}
        </div>
      </TabsContent>
      <TabsContent value="inactive">
        <div>
          {status === "loading" ? (
            "يتم التحميل..."
          ) : status === "error" ? (
            <Alert dir="rtl">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>حدث خطأ اثناء التحميل</AlertTitle>
              <AlertDescription>
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable columns={columns} data={inActiveProducts} />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Products;
