import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingScreen from "@/components/ui/loadingScreen";
import { useTables } from "@/hooks/use-table";

export function Tables() {
  const { data: tables, isLoading: tablesIsLoading } = useTables();

  return (
    <div className="w-full flex gap-8">
      {tablesIsLoading && <LoadingScreen />}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">الكل</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="all">
          <div className="w-full flex gap-4">
            {tablesIsLoading ? (
              <LoadingScreen />
            ) : tables ? (
              <DataTable title="طاولة" columns={columns} data={tables} />
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
    </div>
  );
}

export default Tables;
