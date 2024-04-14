import { useToast } from "@/components/ui/use-toast";
import { Addon, postAddon } from "@/hooks/use-addon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AddonFormProps {
  onClose: (prop) => void;
  selectedCategory: any;
}

const AddonSchema = z.object({
  name: z.string().min(2, "يجب أن يكون الاسم أكثر من حرفين"),
  price: z.string().transform((v) => Number(v) || 0),
});

export default function AddonForm({
  selectedCategory,
  onClose,
}: AddonFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof AddonSchema>>({
    resolver: zodResolver(AddonSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const useCreateAddon = () => {
    return useMutation(
      async (newAddon: Addon) => {
        const { data } = await postAddon(newAddon);
        return data;
      },
      {
        onSuccess: () => {
          toast({
            title: "تم إضافة العنصر بنجاح",
            variant: "default",
            dir: "rtl",
            style: {
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
            },
          });
          queryClient.invalidateQueries("addons-by-category");
          onClose(true);
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: "حدث خطأ أثناء إضافة العنصر",
            variant: "destructive",
            dir: "rtl",
          });
        },
      }
    );
  };

  const createAddonMutation = useCreateAddon();

  const onSubmit = async (data: z.infer<typeof AddonSchema>) => {
    if (!data.name) {
      return;
    }
    createAddonMutation.mutate({
      name: data.name,
      price: data.price,
      addonCategoryId: selectedCategory,
    });
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        dir="rtl"
        className={"grid items-start gap-4"}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم العنصر</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: صوصات" type="text" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سعر العنصر</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">إضافة</Button>
      </form>
    </Form>
  );
}
