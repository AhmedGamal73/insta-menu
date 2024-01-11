"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { QueryClientProvider, useMutation, useQueryClient } from "react-query";
import { addTable, checkTable } from "@/hooks/use-table";
import useSection from "@/hooks/use-section";

// Schema & Types
const tableFormSchema = z.object({
  tableNo: z.number().positive().int(),
  chairsNo: z.number().positive().int(),
  section: z.string().nonempty(),
});

interface Section {
  _id: string;
  name: string;
}

const CreateUser: React.FC = () => {
  const [tableNo, setTableNo] = useState<Number>(0);
  const [chairsNo, setChairsNo] = useState<Number>(0);
  const [section, setSection] = useState<string | undefined>();
  const tableStatus = true;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, status } = useSection();

  const addTableMutation = useMutation(addTable, {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTableMutation.mutate({ tableNo, chairsNo, tableStatus, section });
    console.log(tableNo, chairsNo, tableStatus, section);
  };

  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="أدخل رقم الطاولة"
            type="number"
            required
            onChange={(e) => setTableNo(+e.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="أدخل عدد الكراسي"
            type="number"
            required
            onChange={(e) => setChairsNo(+e.target.value)}
          />
        </div>
        <div>
          <Select
            onValueChange={(e) => {
              const newSection = data.find((section) => section._id === e);
              if (newSection) {
                setSection(newSection.name);
                console.log(section);
              }
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data &&
                  data.map((section) => {
                    return (
                      <SelectItem
                        className="text-right"
                        key={section._id}
                        value={section._id}
                      >
                        {section.name}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">أنشئ طاولة جديدة</Button>
      </form>
    </div>
  );
};
export default CreateUser;
