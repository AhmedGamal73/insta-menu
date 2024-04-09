"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "../../ui/use-toast";
import { postTable } from "@/hooks/use-table";
import useSection from "@/hooks/use-section";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectoinForm from "../sections/SectionForm";

export const CreateUser: React.FC = () => {
  const [tableNo, setTableNo] = useState<Number>(0);
  const [chairsNo, setChairsNo] = useState<Number>(0);
  const [section, setSection] = useState<string | undefined>();
  const tableStatus = true;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: tables } = useSection();

  const addTableMutation = useMutation(postTable, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries("tables");
      setTableNo(0);
      setChairsNo(0);
      toast({
        title: "طاولة جديدة",
        description: `لقد قمت بإنشاء طاولة جديدة برقم ${tableNo}`,
      });
    },
    onError(error, status) {
      toast({
        variant: "destructive",
        title: `الطاولة رقم ${tableNo} موجودة بالفعل`,
      });
    },
  });

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
};
