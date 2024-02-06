import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

const FormSchema = z.object({
  name: z.string({
    required_error: "الرجاء قم بإختيار نادل مسئول",
  }),
});

interface IWaiter {
  _id: string;
  name: string;
  phone: string;
  age: number;
  address: string;
}

const createSection = async () => {
  const res = await fetch("http://localhost:3000/api/sections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
};

export function SectoinForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const fetchWaiters = async () => {
    const res = await axios.get("http://localhost:3001/waiter");
    const data = res.data;
    return data;
  };

  const { data: myWaiters } = useQuery("waiters", fetchWaiters);

  useEffect(() => {
    console.log(myWaiters);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الكابتن</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="قم بإختيار كابتن" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {myWaiters && myWaiters > 0
                    ? myWaiters.map((waiter: IWaiter) => (
                        <SelectItem value={waiter.name}>
                          {waiter.name}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الكابتن</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="قم بإختيار كابتن" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {myWaiters && myWaiters > 0
                    ? myWaiters.map((waiter: IWaiter) => (
                        <SelectItem key={waiter._id} value={waiter.name}>
                          {waiter.name}
                        </SelectItem>
                      ))
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">إرسال</Button>
      </form>
    </Form>
  );
}

export default SectoinForm;
