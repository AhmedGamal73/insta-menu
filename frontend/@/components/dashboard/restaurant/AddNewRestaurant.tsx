import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AddNewRestaurant = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-auto" asChild>
          <Button variant="outline" className="text-base p-2 border rounded-lg">
            <Plus className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>أضف مطعم جديد</DialogTitle>
          </DialogHeader>
          <RestaurantForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const restaurantSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tags: z.string(),
  //   logoURL: z.string(),
  bgImg:
    typeof window !== "undefined"
      ? z.instanceof(FileList).optional()
      : z.unknown().optional(),
});

interface CategoryFormProps extends React.ComponentProps<"form"> {
  onClose: () => void;
  classNaem?: string;
}

function RestaurantForm({ className, onClose }: CategoryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      title: "",
      slug: "",
      tags: "",
    },
  });
  const fileRef = form.register("bgImg");

  const createRestaurant = async (data: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  };

  const createRestaurantMutation = useMutation(createRestaurant, {
    onSuccess: () => {
      toast({
        title: "تم إضافة مطعم جديد بنجاح",
        variant: "default",
        dir: "rtl",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
        },
      });
      queryClient.invalidateQueries("restaurant");
      onClose;
    },
  });

  const onSubmit = async (data: z.infer<typeof restaurantSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("tags", data.tags);
    formData.append("bgImg", data.bgImg[0]);
    createRestaurantMutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        dir="rtl"
        className={cn("grid items-start gap-4", className)}
      >
        <div className="flex justify-between flex-wrap">
          <FormField
            control={form.control}
            name="bgImg"
            render={({ field }) => {
              return (
                <FormItem className="pb-8">
                  <FormLabel>صورة غلاف المطعم</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>عنوان المطعم</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: الحاتي" type="text" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-[48%]">
                <FormLabel>الاسم اللطيف</FormLabel>
                <FormControl>
                  <Input
                    placeholder="اسم المطعم باللغة الإنجليزية "
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.slug?.message}</FormMessage>
                <FormDescription>
                  الكلمة الخاصة بالمطعم التي سوف تظهر في الرابط
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>كلمات توضيحية</FormLabel>
                <FormControl>
                  <Input
                    placeholder="يجب ان يفل بين كل كلمه علامة فاصلة (،)"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.tags?.message}</FormMessage>
                <FormDescription>ثلاث كلمات لوصف منتجات المطعم</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">إضافة</Button>
      </form>
    </Form>
  );
}

export default AddNewRestaurant;
