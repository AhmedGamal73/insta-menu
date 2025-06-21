"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "react-query";
import React, { useEffect } from "react";

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
import { toast } from "../ui/use-toast";
import { CustomerSignup, postCustomerSignup } from "@/hooks/use-customer";

function CustomerSignupDialog({ onSignup }) {
  const [isIndoor, setIsIndoor] = React.useState<boolean>(false);

  const customerSchema = z
    .object({
      name: z.string().min(3),
      phone: z.string().refine(
        (value) => {
          const phoneNumberRegex = /^01\d{9}$/;
          return phoneNumberRegex.test(value);
        },
        {
          message: "يجب ان يكون الرقم 11 رقماً ويبدأ ب 01",
        }
      ),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
      address: isIndoor ? z.string().optional() : z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "يجب ان تتطابق كلمة المرور مع تأكيدها",
      path: ["confirmPassword"],
    });

  const form = useForm<CustomerSignup>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // POST Customer mutation
  const useMutationCustomer = () => {
    return useMutation(
      (customer: CustomerSignup) => postCustomerSignup(customer),
      {
        onSuccess: () => {
          onSignup(true); // Activate login tab
          toast({
            description: "تم إنشاء العميل بنجاح",
            style: {
              justifyContent: "center",
              backgroundColor: "green",
              color: "white",
            },
          });
        },
        onError: (error: any) => {
          if (error.response.data.message === "Phone number already exists") {
            toast({
              description: "رقم الهاتف موجود بالفعل",
              style: {
                justifyContent: "center",
                backgroundColor: "red",
                color: "white",
              },
            });
          }
        },
      }
    );
  };

  const mutation = useMutationCustomer();

  const onSubmit = (customer: CustomerSignup) => {
    mutation.mutate(customer);
  };

  useEffect(() => {
    const tableExist = localStorage.getItem("tableNo");
    if (tableExist) {
      setIsIndoor(true);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً: 01111111111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">تسجيل</Button>
      </form>
    </Form>
  );
}

export default CustomerSignupDialog;
