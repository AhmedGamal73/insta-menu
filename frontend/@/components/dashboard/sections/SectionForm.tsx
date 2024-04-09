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
import { useWaiters } from "@/hooks/use-users";

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

export function SectoinForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: waiters } = useWaiters();

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
                  {waiters && waiters > 0
                    ? waiters.map((waiter: IWaiter) => (
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
        <Button type="submit">إرسال</Button>
      </form>
    </Form>
  );
}

export default SectoinForm;
