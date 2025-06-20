"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  brandName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Min",
    })
    .max(13, {
      message: "Max",
    }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  verifyPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const SignupPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      phoneNumber: "+20",
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const modifiedValues = {
      ...data,
      phoneNumber: `0${data.phoneNumber}`,
    };
    console.log(modifiedValues);
  }

  return (
    <div dir="rtl" className="flex justify-center p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-2">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم التجاري</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  الاسم التجاري الذي سوف يظهر للعملاء
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+20"
                    maxLength={13}
                    {...field}
                    value={
                      field.value.startsWith("+20")
                        ? field.value
                        : `+20${field.value}`
                    }
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/^\+20/, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="shadcn" {...field} />
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
                <FormLabel>الرقم السري</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="verifyPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأكيد الرقم السري</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">تسجيل</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
