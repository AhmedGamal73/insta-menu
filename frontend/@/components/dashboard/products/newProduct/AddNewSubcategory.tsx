import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { QueryClient, useMutation } from "react-query";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Subcategory, postSubcategories } from "@/hooks/use-category";
import categorySchema from "@/schemas/categorySchema";
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

type AddNewSubcategoryProps = {
  selectedCategoryId: string;
};

const AddNewSubcategory = ({ selectedCategoryId }: AddNewSubcategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-base p-2 border rounded-lg">
            <Plus className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>أضف تصنيف فرعي جديد</DialogTitle>
          </DialogHeader>
          <CategoryForm selectedCategoryId={selectedCategoryId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CategoryFormProps extends React.ComponentProps<"form"> {
  selectedCategoryId: string;
}

function CategoryForm({ className, selectedCategoryId }: CategoryFormProps) {
  const { toast } = useToast();
  const queryClient = new QueryClient();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const useCreateSubcategory = (selectedCategoryId: string) => {
    return useMutation(
      async (newSubcategory: Subcategory) => {
        const { data } = await postSubcategories(
          selectedCategoryId,
          newSubcategory
        );
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("categories, subcategories");
          toast({
            title: "تم إضافة التصنيف الفرعي بنجاح",
            variant: "default",
            style: {
              backgroundColor: "#4caf50",
              color: "#fff",
            },
          });
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: "حدث خطأ أثناء إضافة التصنيف الفرعي",
          });
        },
      }
    );
  };

  const createCategoryMutation = useCreateSubcategory(selectedCategoryId);

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    createCategoryMutation.mutate({ name: data.name });
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم التصنيف الفرعي</FormLabel>
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

export default AddNewSubcategory;
