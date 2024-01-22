"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SectoinForm from "./SectionForm";

export function CreateSection() {
  return (
    <Dialog>
      <DialogTrigger dir="rtl" asChild>
        <Button variant="destructive">
          <Plus className="me-2 w-4 h-4" />
          إنشاء قسم جديد
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> إنشاء قسم جديد</DialogTitle>
          <DialogDescription>
            قم بإنشاء قسم جديد للمطعم مرتبط بالطاولات والنادل المسئول
          </DialogDescription>
        </DialogHeader>
        <SectoinForm />
      </DialogContent>
    </Dialog>
  );
}
