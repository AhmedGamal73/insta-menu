import React, { useState, useEffect } from "react";
import { Table, columns } from "./columns";
import { DataTable } from "./data-table";
import CreateUser from "@/components/CreateUser";
import Layout from "../layout";
import { useQueryClient } from "react-query";
import useTable from "@/hooks/use-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

async function getData(): Promise<Table[]> {
  const res = await fetch("http://localhost:3001/api/tables");
  const data = await res.json();
  return data;
}

export const FetchUsersContext = React.createContext<
  (() => Promise<void>) | undefined
>(undefined);

export default function DemoPage() {
  const queryClient = useQueryClient();
  const { data, status } = useTable();

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-4">
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
                يرجي العلم انه اثناء جلب البيانات حدث خطأ ما يرجي المراجعة مع
                احد المهندسين
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </Layout>
  );
}
