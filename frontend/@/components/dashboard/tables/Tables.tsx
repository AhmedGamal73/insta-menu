import { RocketIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { sectionColumns } from "../sections/sectionColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingScreen from "@/components/ui/loadingScreen";
import { useTables } from "@/hooks/use-table";
import useSections from "@/hooks/use-section";

export function Tables() {
  const { data: tables, isLoading: tablesIsLoading } = useTables();
  const { data: sections, isLoading: sectionsLoading } = useSections();

  return (
    <div className="w-full flex gap-8">
      {tablesIsLoading && <LoadingScreen />}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-1/3 grid grid-cols-3">
          <TabsTrigger value="all">الكل</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full flex gap-4" value="all">
          <div className="w-2/3 flex gap-4">
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
          <div className="w-1/3 flex gap-4">
            {sectionsLoading ? (
              <LoadingScreen />
            ) : sections ? (
              <DataTable
                title="سكشن"
                columns={sectionColumns}
                data={sections}
              />
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
