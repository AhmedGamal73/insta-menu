"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import ClientForm from "./ClientForm";

export function ClientDataForm({ orderData, isLoading, id }) {
  React.useEffect(() => {
    if (orderData) {
      console.log({ orderData });
    }
  }, []);
  return (
    <Dialog>
      <DialogTrigger dir="rtl" asChild>
        <button className="flex flex-col justify-center items-center gap-1 text-gray-900 bg-white p-2 rounded-lg">
          <PersonIcon className="w-4 h-4" />
          <span className="align-middle"> العميل</span>
        </button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> إنشاء طاولة جديد</DialogTitle>
          <DialogDescription>
            قم بإنشاء طاولة جديدة مرتبطة بقسم
          </DialogDescription>
        </DialogHeader>
        <ClientForm orderData={orderData} id={id} />
      </DialogContent>
    </Dialog>
  );
}
