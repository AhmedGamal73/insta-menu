"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectCategory } from "../../../../@/components/dashboard/products/newProduct/SelectCategory";
import { SelectAddon } from "../../../../@/components/dashboard/products/newProduct/SelectAddon";
import SelectVariation from "../../../../@/components/dashboard/products/newProduct/SelectVariation";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/dashboard/layout";
import Box from "@/components/ui/Box";
import BackButton from "@/components/ui/BackButton";
import { z } from "zod";

interface CreatePostFormProps {
  name?: string | null;
  image?: string | null;
}

const validationSchema = z
  .object({
    name: z.string().nonempty("الرجاء إدخال اسم المنتج"),
    categoryId: z.string(),
    subcategoryId: z.string(),
    addonCategory: z.string(),
    addons: z.array(z.string()),
    price: z
      .number()
      .refine((val) => val > 0, { message: "الرجاء إدخال سعر صحيح" }),
    description: z.string(),
    calories: z.number(),
    salePrice: z
      .number()
      .refine((val) => val > 0, { message: "الرجاء إدخال سعر خصم صحيح" }),
  })
  .refine((data) => data.salePrice <= data.price, {
    message: "سعر الخصم يجب أن يكون أقل من السعر الإفتراضي",
  });

export default function CreatePostForm(user: CreatePostFormProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);
  const [addonCategoryId, setAddonCategoryId] = useState<string>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const { toast } = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("الرجاء إختيار صورة للمنتج");
      return;
    }

    const formData = new FormData();
    formData.append("img", file);
    formData.append("name", e.target.name.value);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("addonCategory", addonCategoryId);
    formData.append("addons", addons.join(","));
    +formData.append("price", e.target.price.value);
    formData.append("description", e.target.description.value);
    formData.append("calories", e.target.calories.value);
    formData.append("salePrice", e.target.salePrice.value);

    const price = Number(e.target.price.value); // Convert price to number
    const calories = Number(e.target.calories.value); // Convert calories to number
    const salePrice = Number(e.target.salePrice.value); // Convert salePrice to number
    try {
      validationSchema.parse({
        name: e.target.name.value,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        addonCategory: addonCategoryId,
        addons: addons,
        price: price,
        description: e.target.description.value,
        calories: calories,
        salePrice: salePrice,
      });

      await axios.post(`http://localhost:3001/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "تم إضافة المنتج بنجاح",
        style: {
          backgroundColor: "green",
          color: "white",
          textAlign: "right",
          border: "none",
        },
      });
    } catch (error) {
      setErrorMessage(error.errors[0].message);
      toast({
        dir: "rtl",
        variant: "destructive",
        title: errorMessage.toString(),
      });
      return;
    }
  };

  useEffect(() => {
    setSubcategoryId("");
    console.log({ addonCategoryId: addonCategoryId });
  }, [categoryId]);

  return (
    <Layout desc="قم بإنشاء منتج جديد" title="منتج جديد">
      <form
        className="w-full flex justify-center items-center bg-slate-50"
        onSubmit={handleSubmit}
        dir="rtl"
      >
        <div className="w-10/12 flex flex-col gap-8 px-6 py-4">
          <div className="w-full bg-white flex justify-between px-4 py-3 border border-b rounded-lg shadow-sm">
            <div className="flex gap-2 ">
              <Button type="submit">حفظ المنتج</Button>
              <Button variant="outline">حفظ وأضف منتج جديد</Button>
            </div>
            <BackButton />
          </div>
          <div className="w-full flex gap-4">
            <div className="w-2/3 flex flex-col gap-4">
              <Box title="تفاصيل عامة" className="w-full" dataClassName="gap-4">
                <div className="flex gap-4 items-start pb-4 w-full">
                  <div className="flex flex-col gap-8 w-full">
                    <div className="w-full flex gap-4">
                      <label className="w-1/2 text-sm text-text flex flex-col gap-2">
                        اسم المنتج
                        <Input
                          type="text"
                          name="name"
                          placeholder="ادخل اسم المنتج"
                        />
                      </label>

                      <label className="w-1/2 text-sm text-text flex flex-col gap-2">
                        السعرات الحرارية
                        <Input
                          type="number"
                          name="calories"
                          placeholder="ادخل السعرات الحرارية"
                        />
                      </label>
                    </div>

                    <label className="w-full text-sm text-textflex flex-col gap-2">
                      وصف المنتج
                      <Textarea
                        name="description"
                        placeholder="ادخل وصف المنتج"
                      />
                    </label>
                  </div>
                </div>
              </Box>

              <Box className="w-full" title="إضافات المنتج">
                <SelectAddon onSelectedAddonsChange={handleSelectedAddons} />
              </Box>

              <Box className="w-full" title="خيارات المنتج">
                <SelectVariation />
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
                            setCategoryId("");
                            setSubcategoryId("");
                          }}
                          variant="destructive"
                        >
                          مسح الصورة
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full flex flex-col justify-center items-center cursor-pointer p-4">
                      <div
                        className="w-[200px] h-[200px] flex justify-center items-center rounded-lg border-dashed border hover:cursor-pointer transform-gpu active:scale-75 transition-all text-neutral-500"
                        aria-label="Attach media"
                        role="img"
                      >
                        <span>ارفق الصورة هنا</span>
                      </div>

                      <input
                        className="bg-transparent flex-1 border-none outline-none hidden"
                        name="image"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
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
                title="تصنيف المنتج"
                className="w-full flex flex-col justify-center items-center"
              >
                <div className="w-full flex flex-col gap-4">
                  <label className="w-full text-sm text-text flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      السعر الإفتراضي للمنتج{" "}
                      <span className="text-xs text-red-500">*</span>
                    </div>
                    <Input
                      type="number"
                      name="price"
                      placeholder="السعر الإفتراضي"
                      onChange={(e) => {
                        setPrice(e.target.valueAsNumber);
                      }}
                    />
                  </label>

                  <label className="w-full flex flex-col text-text gap-2 text-sm">
                    سعر الخصم
                    <Input
                      className={
                        salePrice > 0 && salePrice <= price
                          ? "border-red-500"
                          : ""
                      }
                      type="number"
                      name="salePrice"
                      onChange={(e) => {
                        setSalePrice(e.target.valueAsNumber);
                      }}
                      placeholder="سعر الخصم"
                    />
                  </label>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
