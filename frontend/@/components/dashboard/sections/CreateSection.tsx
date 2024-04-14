"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Section, postSection } from "@/hooks/use-section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function CreateSection() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center w-2/12" dir="rtl" asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> إنشاء قسم جديد</DialogTitle>
          <DialogDescription>
            قم بإنشاء قسم جديد مرتبط بكباتن وطاولات
          </DialogDescription>
        </DialogHeader>
        <SectionForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const FormSchema = z.object({
  name: z.string({
    required_error: "الرجاء قم بإدخال اسم القسم",
  }),
});

const SectionForm = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addSectionMutation = useMutation(postSection, {
    onSuccess() {
      queryClient.invalidateQueries("sections");
      onClose(true);
      toast({
        title: "تم إنشاء قسم جديد بنجاح",
        dir: "rtl",
        style: {
          backgroundColor: "#4caf50",
          border: "none",
          color: "white",
        },
      });
    },
    onError(data, error, status) {
      toast({
        variant: "destructive",
        title: `القسم موجود بالفعل`,
        dir: "rtl",
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addSectionMutation.mutate(data as Section);
    // console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الطاولة</FormLabel>
              <FormControl>
                <Input type="text" placeholder="مثال: 55" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          إنشاء
        </Button>
      </form>
    </Form>
  );
};
