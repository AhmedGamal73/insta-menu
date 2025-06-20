import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const AddNewCategory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-auto" asChild>
          <Button variant="outline" className="text-base p-2 border rounded-lg">
            <Plus className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>أضف تصنيف جديد</DialogTitle>
          </DialogHeader>
          <CategoryForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const categorySchema = z.object({
  name: z.string(),
  img:
    typeof window !== "undefined"
      ? z.instanceof(FileList).optional()
      : z.unknown().optional(),
});

interface CategoryFormProps extends React.ComponentProps<"form"> {
  onClose: (prop) => void;
  classNaem?: string;
}

function CategoryForm({ className, onClose }: CategoryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  const fileRef = form.register("img");

  const createCategory = async (data: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  };

  const createCategoryMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      onClose(true);
      toast({
        title: "تم إضافة التصنيف بنجاح",
        variant: "default",
        dir: "rtl",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
        },
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("img", data.img[0]);
    createCategoryMutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        dir="rtl"
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="shadcn" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الصنف</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: مكرونات" type="text" {...field} />
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

export default AddNewCategory;
