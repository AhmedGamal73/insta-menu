import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { putOrder } from "@/hooks/use-order";

const FormSchema = z.object({
  orderName: z.string({
    required_error: "الرجاء قم بإدخال رقم للطاولة",
  }),

  phoneNumber: z.string({
    required_error: "الرجاء قم بإدخال رقم للطاولة",
  }),
});

const ClientForm = ({ orderData, id }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const putOrderMutation = useMutation(
    (params: { id: string; newData: any }) =>
      putOrder(params.id, params.newData),
    {
      onSuccess() {
        queryClient.invalidateQueries("order");
        queryClient.invalidateQueries("orders");
        toast({
          title: "تم تحديث الطلب",
          dir: "rtl",
        });
        const updatedOrder = queryClient.getQueryData("order");
        console.log(updatedOrder);
      },
      onError(data, error, status) {
        toast({
          variant: "destructive",
          title: "خطأ في تحديث الطلب",
        });
      },
    }
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orderName: orderData.orderName,
      phoneNumber: orderData.phoneNumber,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...orderData,
      orderName: data.orderName,
      phoneNumber: data.phoneNumber,
    };
    putOrderMutation.mutate({ id, newData });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="orderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الطلب</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
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
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" type="submit">
          تعديل
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;
