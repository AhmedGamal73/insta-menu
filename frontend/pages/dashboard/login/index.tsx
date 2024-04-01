"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "react-query";
import React, { use, useEffect } from "react";

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
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type User = {
  username: string;
  password: string;
  role: string;
};

function LoginForm() {
  const [userType, setUserType] = React.useState<string>("waiter");

  const active =
    "font-normal text-white bg-primary py-2 px-4 rounded-lg cursor-pointer transform scale-310";
  const waiterSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  });

  const form = useForm<User>({
    resolver: zodResolver(waiterSchema),
    defaultValues: {
      username: "",
      password: "",
      role: userType,
    },
  });

  //   POST Customer mutation
  // const useMutationWaiter = () => {
  //   return useMutation((waiter: Waiter) => postWaiter(waiter), {
  //     onSuccess: () => {
  //       toast({
  //         description: "تم إنشاء العميل بنجاح",
  //         style: {
  //           justifyContent: "center",
  //           backgroundColor: "green",
  //           color: "white",
  //         },
  //       });
  //     },
  //     onError: (error: any) => {
  //       if (error.response.data.message === "Phone number already exists") {
  //         toast({
  //           description: "رقم الهاتف موجود بالفعل",
  //           style: {
  //             justifyContent: "center",
  //             backgroundColor: "red",
  //             color: "white",
  //           },
  //         });
  //       }
  //     },
  //   });
  // };

  // const mutation = useMutationWaiter();

  const onSubmit = (user: User) => {
    // mutation.mutate(waiter);
    console.log(user);
  };

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="w-[400px] flex flex-col gap-4">
        <div className="w-full bg-white rounded-xl">
          <RadioGroup
            defaultValue="waiter"
            className="w-full flex justify-between items-center bg-white shadow-sm rounded-xl py-3 px-4 transition-all duration-300 ease-in-out"
          >
            <div>
              <RadioGroupItem value="waiter" />
              <Label
                onClick={() => setUserType("waiter")}
                className={
                  userType === "waiter"
                    ? active
                    : "p-2 py-2 px-4 cursor-pointer"
                }
              >
                كابتن
              </Label>
            </div>

            <div>
              <RadioGroupItem value="admin" />
              <Label
                onClick={() => setUserType("admin")}
                className={
                  userType === "admin" ? active : "p-2 py-2 px-4 cursor-pointer"
                }
              >
                مدير
              </Label>
            </div>

            <div>
              <RadioGroupItem value="cashier" />
              <Label
                onClick={() => setUserType("cashier")}
                className={
                  userType === "cashier"
                    ? active
                    : "p-2 py-2 px-4 cursor-pointer"
                }
              >
                كاشير
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Form {...form}>
          <form
            dir="rtl"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-white flex space-x-1 items-center justify-between flex-wrap gap-2 shadow-2xl p-4 rounded-xl border "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>اسم المستخدم</FormLabel>
                  <FormControl>
                    <Input placeholder="ahmedHossam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              تسجيل الدخول
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
