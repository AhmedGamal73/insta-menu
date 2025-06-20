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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User } from "@/types/user";
import { postUser } from "@/hooks/use-users";
import useGetSections from "@/hooks/use-section";
import { toast } from "@/components/ui/use-toast";

const roles = ["admin", "cashier", "waiter"];

function UserForm() {
  const [isIndoor, setIsIndoor] = React.useState<boolean>(false);
  const { data: sections } = useGetSections();
  const [userRole, setUserRole] = React.useState<string>("cashier");

  const tableExist = localStorage.getItem("tableNo");
  if (tableExist !== null) {
    setIsIndoor(true);
  }

  const userSchema = z
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
      section: z.string().optional(),
      role: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "يجب ان تتطابق كلمة المرور مع تأكيدها",
      path: ["confirmPassword"],
    });

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  //   POST Customer mutation
  const useMutationWaiter = () => {
    return useMutation((user: User) => postUser(user), {
      onSuccess: () => {
        console.log("User created successfully");
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
    });
  };

  const mutation = useMutationWaiter();

  const onSubmit = (user: User) => {
    mutation.mutate(user);
    console.log(user);
  };

  useEffect(() => {
    console.log(sections);
  }, []);

  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-1 w-full items-center justify-between flex-wrap gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-[48%]">
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً احمد حسام" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-[48%]">
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
          name="role"
          render={({ field }) => (
            <FormItem className="w-[48%]">
              <FormLabel>نوع المستخدم</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setUserRole(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="الرجاء إختيار نوع المستخدم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles?.map((section, index) => (
                    <SelectItem key={index} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {userRole === "waiter" && (
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>القسم المسئول عنه</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="الرجاء إختيار القسم المسئول عنه" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sections?.map((section) => (
                      <SelectItem key={section._id} value={section._id}>
                        {section.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-[48%]">
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
            <FormItem className="w-[48%]">
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
            <FormItem className="w-[48%]">
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-[48%]">
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً: 50 شارع الميرغني" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          تسجيل
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
