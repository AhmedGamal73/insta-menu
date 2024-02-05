"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

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
import { Customer, postCustomer } from "@/hooks/use-customer";
import { useMutation } from "react-query";
import { toast } from "../ui/use-toast";
import React, { useEffect } from "react";

function CustomerInfoForm(props) {
  const [isIndoor, setIsIndoor] = React.useState<boolean>(false);

  let customerType: "indoor" | "outdoor";
  if (isIndoor) {
    customerType = "indoor";
  } else {
    customerType = "outdoor";
  }

  const storage = localStorage.getItem("tableNo");
  useEffect(() => {
    if (storage) {
      setIsIndoor(false);
    }
    const newSchema = z.object({
      // other fields...
      address: isIndoor ? z.string().optional() : z.string(),
    });
  }, []);

  const CustomerInfoFormSchema = z.object({
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
    type: z.enum(["indoor", "outdoor"]),
    address: isIndoor ? z.string().optional() : z.string(),
  });

  const form = useForm<Customer>({
    resolver: zodResolver(CustomerInfoFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: customerType,
      address: "",
    },
  });

  // POST Customer mutation
  const useMutationCustomer = () => {
    return useMutation((customer: Customer) => postCustomer(customer), {
      onSuccess: () => {
        console.log({ message: "Customer created successfully" });
        props.onOpenChange(false);
        toast({
          description: "تم إنشاء العميل بنجاح",
          style: {
            justifyContent: "center",
            backgroundColor: "green",
            color: "white",
          },
        });
      },
      onError: (error) => {
        console.log({ message: error });
      },
    });
  };

  const mutation = useMutationCustomer();
  function onSubmit(values: Customer) {
    console.log(values);
    mutation.mutate(values);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً احمد حسام" {...field} />
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
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً: 01111111111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isIndoor && (
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: 50 شارع الميرغني" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CustomerInfoForm;
