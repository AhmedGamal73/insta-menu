import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";

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
import { AddonCategory, postAddonCategory } from "@/hooks/use-addon";

const AddonCategorySchema = z.object({
  name: z.string().min(2, "يجب أن يكون الاسم أكثر من حرفين"),
});

export default function AddNewAddonCategory() {
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
          <AddonCategoryForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface AddonCategoryFormProps {
  onClose: (prop) => void;
  className?: string;
}

function AddonCategoryForm({ className, onClose }: AddonCategoryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof AddonCategorySchema>>({
    resolver: zodResolver(AddonCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const useCreateCategory = () => {
    return useMutation(
      async (newCategory: AddonCategory) => {
        const { data } = await postAddonCategory(newCategory);
        return data;
      },
      {
        onSuccess: () => {
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
          queryClient.invalidateQueries("addons-categories");
          onClose(true);
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: "حدث خطأ أثناء إضافة التصنيف",
            variant: "destructive",
          });
        },
      }
    );
  };

  const createCategoryMutation = useCreateCategory();

  const onSubmit = async (data: z.infer<typeof AddonCategorySchema>) => {
    if (!data.name) {
      return;
    }
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
                <FormLabel>اسم الصنف</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: صوصات" type="text" {...field} />
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
