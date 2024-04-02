"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import TableForm from "./TableForm";

export function CreateTable() {
  return (
    <Dialog>
      <DialogTrigger dir="rtl" asChild>
        <Button variant="destructive">
          <Plus className="me-2 w-4 h-4" />
          إنشاء طاولة جديد
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> إنشاء طاولة جديد</DialogTitle>
          <DialogDescription>
            قم بإنشاء طاولة جديدة مرتبطة بقسم
          </DialogDescription>
        </DialogHeader>
        <TableForm />
      </DialogContent>
    </Dialog>
  );
}
