import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectCategory } from "../../../../@/components/dashboard/products/newProduct/SelectCategory";
import { SelectAddon } from "../../../../@/components/dashboard/products/newProduct/SelectAddon";
import SelectVariation from "../../../../@/components/dashboard/products/newProduct/SelectVariation";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/dashboard/layout";
import Box from "@/components/ui/Box";
import { VariationProvider } from "@/context/VariationContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InnerPageHeader from "@/components/ui/inner-page-header";
import { SelectRestaurant } from "@/components/dashboard/products/newProduct/SelectRestaurant";
import { useMutation } from "react-query";
import { toast } from "@/components/ui/use-toast";

interface CreatePostFormProps {
  name?: string | null;
  image?: string | null;
}

const productSchema = z
  .object({
    img:
      typeof window !== "undefined"
        ? z.instanceof(FileList).optional()
        : z.unknown().optional(),
    name: z.string().min(1, "الرجاء إدخال اسم المنتج"),
    desc: z.string().optional(),
    calories: z
      .string()
      .optional()
      .transform((v) => Number(v) || 0),
    price: z
      .string()
      .optional()
      .transform((v) => Number(v) || 0),
    salePrice: z
      .string()
      .optional()
      .transform((v) => Number(v) || 0),
  })
  .refine((data) => data.price > data.salePrice, {
    message: "سعر الخصم يجب أن يكون أقل من السعر الإفتراضي",
  });

export default function CreatePostForm(user: CreatePostFormProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [addonCategoryId, setAddonCategoryId] = useState<string>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [variations, setVariations] = useState<any[]>([]);

  // handle image change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // handle restaurant select
  const handleRestaurantSelect = (restId: string) => {
    setRestaurantId(restId);
  };

  // handle category and subcategory change
  const handleCategorySelect = (categoryId: string) => {
    setCategoryId(categoryId);
  };
  const handleSubcategorySelect = (subcategoryId: string) => {
    setSubcategoryId(subcategoryId);
  };

  // handle selected addons
  const handleSelectedAddons = (
    selectedAddons: string[],
    selectedAddonCategory: string
  ) => {
    setAddons(selectedAddons);
    setAddonCategoryId(selectedAddonCategory);
  };

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      desc: "",
    },
  });

  const fileRef = form.register("img");

  const createProduct = async (formData: FormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  };

  const mutation = useMutation(createProduct, {
    onSuccess: (data) => {
      toast({
        title: "تم إنشاء منتج جديد بنجاح",
        dir: "rtl",
        style: {
          backgroundColor: "#4BB543",
          color: "#fff",
        },
      });
    },
  });

  async function onSubmit(data: z.infer<typeof productSchema>) {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "img" && (data.img as FileList)?.length > 0) {
          formData.append(key, data.img[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
      formData.append("categoryId", categoryId);
      formData.append("subcategoryId", subcategoryId);
      formData.append("restaurantId", restaurantId);
      addons.forEach((addon, index) => {
        formData.append(`addons[${index}]`, addon);
      });
      formData.append("addonCategoryId", addonCategoryId);
      formData.append("variations", JSON.stringify(variations[0]));

      if (variations.length === 0 && data.price === 0) {
        toast({
          title: "يجب إضافة سعر للمنتج",
          dir: "rtl",
          style: {
            backgroundColor: "#FF0000",
            color: "#fff",
          },
        });
        return;
      }

      mutation.mutate(formData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data); // Log server error message
      }
    }
  }

  useEffect(() => {
    setSubcategoryId("");
  }, [categoryId]);

  return (
    <VariationProvider>
      <Layout desc="قم بإنشاء منتج جديد" title="منتج جديد">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            dir="rtl"
            className="w-full flex justify-center items-center bg-slate-50 px-8"
          >
            <div className="w-full flex flex-col gap-8 px-6 py-4">
              <InnerPageHeader href="/dashboard/products">
                <Button type="submit">حفظ المنتج</Button>
                <Button variant="outline">حفظ وأضف منتج جديد</Button>
              </InnerPageHeader>
              <div className="w-full flex  gap-4">
                <div className="w-2/3 flex flex-col gap-4">
                  <Box
                    title="تفاصيل عامة "
                    className="w-full"
                    dataClassName="gap-4"
                  >
                    <div className="flex gap-4 items-start pb-4 w-full">
                      <div className="flex flex-col gap-4 w-full">
                        <div className="w-full flex gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="w-1/2 text-sm text-text flex flex-col gap-2">
                                <FormLabel>اسم المنتج</FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="ادخل اسم المنتج"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="calories"
                            render={({ field }) => (
                              <FormItem className="w-1/2 text-sm text-text flex flex-col gap-2">
                                السعرات الحرارية
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="ادخل السعرات الحرارية"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="desc"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full text-sm text-textflex flex-col gap-2">
                                <FormLabel>الوصف</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="ادخل وصف المنتج"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Box>

                  <Box
                    dataClassName=""
                    className="w-full"
                    title="إضافات المنتج"
                  >
                    <SelectAddon
                      onSelectedAddonsChange={handleSelectedAddons}
                    />
                  </Box>

                  <Box
                    dataClassName=""
                    className="w-full"
                    title="خيارات المنتج"
                  >
                    <SelectVariation setVariations={setVariations} />
                  </Box>
                </div>
                <div className="w-1/3 flex flex-col gap-4">
                  <Box
                    dataClassName="flex-col"
                    title="صورة المنتج"
                    className="w-full flex flex-col justify-center items-center"
                  >
                    <div>
                      {file && previewUrl !== undefined ? (
                        <div className="w-full flex justify-center items-center">
                          <div className="w-3/4 h-3/4">
                            <img
                              className="w-full rounded-t-lg"
                              src={previewUrl}
                              alt="Selected file h-24 w-24"
                            />
                            <Button
                              className="w-full rounded-t-none"
                              onClick={() => {
                                setFile(null);
                                setPreviewUrl(null);
                              }}
                              variant="destructive"
                            >
                              مسح الصورة
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <label className="w-full flex flex-col justify-center items-center cursor-pointer p-4">
                          <div aria-label="Attach media" role="img">
                            <span>ارفق الصورة هنا</span>
                          </div>

                          <FormField
                            control={form.control}
                            name="img"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>File</FormLabel>
                                  <FormControl>
                                    <Input
                                      onChange={handleFileChange}
                                      type="file"
                                      placeholder="shadcn"
                                      {...fileRef}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </Box>

                  <Box
                    dataClassName="flex-col"
                    title="تصنيف المنتج"
                    className="w-full flex flex-col justify-center items-center"
                  >
                    <div className="w-full flex gap-4">
                      <label className="w-full text-sm text-text flex flex-col gap-2">
                        <SelectCategory
                          onCategorySelect={handleCategorySelect}
                          onSubcategorySelect={handleSubcategorySelect}
                        />
                      </label>
                    </div>
                  </Box>

                  <Box
                    dataClassName="flex-col"
                    title="المطعم"
                    className="w-full flex flex-col justify-center items-center"
                  >
                    <div className="w-full flex gap-4">
                      <label className="w-full text-sm text-text flex flex-col gap-2">
                        <SelectRestaurant
                          onRestaurantSelect={handleRestaurantSelect}
                        />
                      </label>
                    </div>
                  </Box>

                  <Box
                    dataClassName="flex-col"
                    title="سعر المنتج"
                    className="w-full flex flex-col justify-center items-center"
                  >
                    <div className="w-full flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> السعرالأصلي</FormLabel>
                            <FormControl>
                              <Input
                                name="price"
                                type="number"
                                placeholder="السعر الإفتراضي"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-full flex flex-col text-text gap-2 text-sm">
                              <FormLabel>سعر الخصم</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  name="salePrice"
                                  type="number"
                                  placeholder="سعر الخصم"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </Layout>
    </VariationProvider>
  );
}
