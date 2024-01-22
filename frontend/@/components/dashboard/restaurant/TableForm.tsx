import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useSection from "@/hooks/use-section";
import { addTable, deleteTable } from "@/hooks/use-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { table } from "console";

const FormSchema = z.object({
  tableNo: z
    .string({
      required_error: "الرجاء قم بإدخال رقم للطاولة",
    })
    .transform(Number),
  chairsNo: z
    .string({
      required_error: "يجب إدخال عدد الكراسي",
    })
    .transform(Number),
  sectionId: z.string({
    required_error: "يجب إختيار قسم من الأقسام",
  }),
});

const TableForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: sections } = useSection();

  const addTableMutation = useMutation(addTable, {
    onSuccess() {
      queryClient.invalidateQueries("tables");
      toast({
        title: "طاولة جديدة",
        description: `لقد قمت بإنشاء طاولة جديدة برقم`,
      });
    },
    onError(data, error, status) {
      toast({
        variant: "destructive",
        title: `الطاولة موجودة بالفعل`,
        description: `الطاولة  ق  التي تحاول إدخالها موجودة بالفعل`,
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tableNo: 0,
      chairsNo: 0,
      sectionId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    let { tableNo, chairsNo, sectionId } = data;
    tableNo = Number(tableNo) || 0;
    chairsNo = Number(chairsNo) || 0;
    addTableMutation.mutate({ tableNo, chairsNo, sectionId });
    console.log(tableNo, chairsNo, sectionId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tableNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الطاولة</FormLabel>
              <FormControl>
                <Input type="text" placeholder="مثال: 55" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chairsNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد الكراسي لكل طاولة</FormLabel>
              <FormControl>
                <Input type="text" placeholder="مثال: 4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>حدد القسم</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sections &&
                    sections.map((section) => {
                      return (
                        <SelectItem key={section._id} value={section._id}>
                          {section.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" type="submit">
          إنشاء
        </Button>
      </form>
    </Form>
  );
};

export default TableForm;
