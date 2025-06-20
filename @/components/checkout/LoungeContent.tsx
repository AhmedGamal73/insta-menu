"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type LoungeFormProps = {
  customerName: string;
  tableNo: number;
  phone: string;
};

const LoungeContent = ({ tableNo }) => {
  const [disabled, setDisabled] = useState(false);
  const customerName = "ahmed";

  const LoungeSchema = z.object({
    customerName: z.string(),
    tableNo: z.string(),
    phone: z.string(),
  });

  const form = useForm<LoungeFormProps>({
    resolver: zodResolver(LoungeSchema),
    defaultValues: {
      customerName: customerName,
      phone: "",
      tableNo: tableNo,
    },
  });

  function onSubmit(customer: LoungeFormProps) {
    console.log(customer);
  }
  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">الاسم</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="الاورد باسم"
                  defaultValue={customerName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tableNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">رقم الطاولة</FormLabel>
              <FormControl>
                <Input placeholder="رقم طاولة الطلب" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="رقم طاولة الطلب" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">تسجيل الدخول</Button>
      </form>
    </Form>
  );
};
export default LoungeContent;
