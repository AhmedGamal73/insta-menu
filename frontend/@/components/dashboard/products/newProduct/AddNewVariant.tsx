import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { GripVertical, PlusIcon, Trash2 } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { variantSchema } from "@/schemas/variationSchema";
import { VariationContext } from "@/context/VariationContext";
import { DialogOverlay } from "@radix-ui/react-dialog";

export default function AddNewVariant({ currentVariant, setCurrentVariant }) {
  const [open, setOpen] = useState(false);
  const { variations } = useContext(VariationContext);

  useEffect(() => {
    if (currentVariant) {
      setOpen(true);
    }
  }, [currentVariant]);

  useEffect(() => {
    console.log(variations);
  }, [variations]);
  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay onPointerDown={(e) => e.stopPropagation()} />
        <DialogTrigger className="w-full">
          {variations?.length === 0 && (
            <Button variant="link" className="w-full flex justify-start">
              <PlusIcon className="w-4 h-4" />
              <span>اضف خياراً</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          onInteractOutside={() => setCurrentVariant(null)}
          className="sm:max-w-[600px]"
        >
          <div className="w-6 h-6 bg-white absolute left-4 top-4 z-10"></div>
          <DialogHeader>
            <DialogTitle>أضف خيار جديد</DialogTitle>
          </DialogHeader>

          <VariationForm
            setOpen={setOpen}
            setCurrentVariant={setCurrentVariant}
            currentVariant={currentVariant}
          />

          <DialogFooter></DialogFooter>
        </DialogContent>
        <DialogOverlay onPointerDown={(e) => e.stopPropagation()} />
      </Dialog>
    </div>
  );
}

type option = {
  name: string;
  price: number;
  salePrice: number;
};

type variant = {
  title: string;
  options: option[];
};

function VariationForm({ currentVariant, setCurrentVariant, setOpen }) {
  // show the title input when the user add the first option
  const [showTitle, setShowTitle] = useState(false);
  const [titleExists, setTitleExists] = useState(false);

  const { variations, setVariations, updateVariant, removeOption } =
    useContext(VariationContext);

  const {
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm();

  const watchedTitle = watch("title");

  // form options array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  // link between the form and the schema
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: currentVariant
      ? {
          ...currentVariant,
          options: currentVariant.options.map((option) => ({
            ...option,
            price: option.price.toString(),
            salePrice: option.salePrice.toString(),
          })),
        }
      : {
          title: "",
          options: [{ name: "", price: 0, salePrice: "0" }],
        },
  });

  const onSubmit = async (data: z.infer<typeof variantSchema>) => {
    const isTitleExists = variations.some(
      (variant) => variant.title === watchedTitle
    );

    if (isTitleExists) {
      setTitleExists(true);
    }
    if (currentVariant) {
      updateVariant(currentVariant.title, data);
      setOpen(false);
      setCurrentVariant(null);
    } else {
      setVariations((prev) => [...prev, data]);
      setOpen(false);
    }
  };

  const addNewOptionHandller = () => {
    append({ name: "", price: 0, salePrice: 0 });
    setShowTitle(true);
  };

  const onCloseHandller = () => {
    setCurrentVariant(null);
    setOpen(false);
  };

  const removeOptionHandller = (index) => () => {
    remove(index);
  };

  useEffect(() => {
    if (currentVariant) {
      reset(currentVariant);
    }
  }, [variations, reset, currentVariant]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        dir="rtl"
        className="w-full flex flex-col gap-4"
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: الحجم" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          {showTitle && (
            <div className="pb-4">
              <div className="w-3/4 flex justify-between items-center gap-4">
                <FormLabel>الاسم</FormLabel>
                <FormLabel>السعر</FormLabel>
                <FormLabel>سعر البيع</FormLabel>
              </div>
              <div className="1/4"></div>
            </div>
          )}
          {fields.map((_, index) => (
            <ul className="w-full flex">
              <li
                key={index}
                className="w-full flex justify-between items-center gap-4"
              >
                <div className="w-full flex justify-center items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`options.${index}.name`}
                    key={index + 1}
                    render={({ field }) => (
                      <FormItem className="1/3">
                        <FormControl>
                          <Input
                            className={titleExists ? "border-red-500" : ""}
                            {...field}
                            placeholder="مثلاً: كبير"
                            type="text"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`options.${index}.price`}
                    key={index + 2}
                    render={({ field }) => (
                      <FormItem className="1/3">
                        <FormControl>
                          <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`options.${index}.salePrice`}
                    key={index + 3}
                    render={({ field }) => (
                      <FormItem className="1/3">
                        <FormControl>
                          <Input {...field} placeholder="0" type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  className="w-auto flex justify-center items-center"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            </ul>
          ))}

          <Button variant="link" onClick={addNewOptionHandller}>
            <PlusIcon className="w-4 h-4" />
            اضف قيمة اخرى
          </Button>
        </div>
        <div className="w-full flex gap-2">
          <Button disabled={titleExists} className="w-1/2" type="submit">
            {currentVariant ? "تعديل" : "إضافة"}
          </Button>
          <Button
            className="w-1/2"
            variant="outline"
            onClick={onCloseHandller}
            type="button"
          >
            إلغاء{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
