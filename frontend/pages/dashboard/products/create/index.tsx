import { Upload, X } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Sidbar from "@/components/dashboard/sidebar/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddNewCategory from "@/components/dashboard/products/newProduct/AddNewCategory";
import AddProductCard from "@/components/ui/AddProductCard";
import { Category, useCategory } from "@/hooks/use-category";
import { Toaster } from "@/components/ui/toaster";
import ProductFormSchema from "@/schemas/ProductFormSchema";
import Subcategories from "@/components/dashboard/products/newProduct/Subcategories";
import AddNewSubcategory from "@/components/dashboard/products/newProduct/AddNewSubcategory";
import { useCreateProduct } from "@/hooks/use-product";
import { Label } from "@/components/ui/label";
import UploadImage from "@/components/dashboard/products/newProduct/UploadImage";

const CreateProductPage = () => {
  const [img, setImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const { data: categories } = useCategory();
  const { reset } = useForm();

  const form = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      salePrice: 0,
      description: "",
      categoryId: "",
      subcategoryId: "",
      img: "",
      // calories: 0,
      // addons: [],
      // ingredients: [],
      // active: true,
      // variations: [],
      // variable: false,
    },
  });

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImg(file);
    if (imgPreview) {
      URL.revokeObjectURL(imgPreview);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    } else {
      setImgPreview(null);
    }
  };

  const selectedCategory = form.watch("categoryId");
  const createNewProduct = useCreateProduct();

  const onSubmit = (values: z.infer<typeof ProductFormSchema>) => {
    if (!values.name) {
      console.log("name is required");
      return;
    }
    reset();
  };

  // Check the save image & preview image
  useEffect(() => {
    console.log(img, imgPreview);
  }, [img, imgPreview]);

  return (
    <div dir="rtl" className="w-full flex h-screen">
      <Sidbar className="w-1/6" />
      <div className="w-full h-screen flex flex-col shadow-lg rounded-r-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center">
              <div className="w-[1200px] flex justify-between items-center py-4">
                <div className="flex gap-4">
                  <Link href="/dashboard/products">
                    <X className="w-8 h-8 p-1 text-text border-2 border-grey-100 rounded-sm " />
                  </Link>
                  <Badge className="bg-green-400 rounded-lg px-4">مفعل</Badge>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="text-xs">
                    حفظ وإضافة المزيد
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="text-xs py-[4px] px-4"
                  >
                    حفظ
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full h-screen flex justify-center items-start bg-gray-100 border-t-2 pt-6">
              <div className="w-[1200px] gap-6 flex justify-between items-start">
                <div className="w-2/3 flex flex-col gap-4">
                  <AddProductCard width="w-full" title="تفاصيل المنتج">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="img"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl onChange={handleImgUpload}>
                            <Label className="w-full flex border-dashed border-2 rounded hover:bg-slate-50 ">
                              {img && imgPreview ? (
                                <div className="flex m-4 w-32 h-32 flex-col gap-0 justify-start items-start border rounded-b-sm pointer-events-none">
                                  <img
                                    src={imgPreview}
                                    alt="Selected file"
                                    className="w-full h-4/5"
                                  />
                                  <button
                                    className="h-1/5 w-full text-xs bg-red-500 text-white rounded-b-sm"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setImg(null);
                                      setImgPreview(null);
                                      console.log(imgPreview, img);
                                    }}
                                  >
                                    {" "}
                                    مسح الصورة
                                  </button>
                                </div>
                              ) : (
                                <UploadImage />
                              )}
                              <Input
                                className="py-8 hidden"
                                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                                aria-label="dd"
                                type="file"
                                {...field}
                              />
                            </Label>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </AddProductCard>
                  <AddProductCard width="w-full" title="خيارات">
                    <div></div>
                  </AddProductCard>
                </div>
                <div className="w-1/3 flex flex-col gap-4  ">
                  <AddProductCard title="التصنيف" width="w-full">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التصنيف</FormLabel>
                          <Select
                            dir="rtl"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="إختر تصنيف" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <AddNewCategory />
                                {categories && categories.length > 0
                                  ? categories?.map((category: Category) => (
                                      <SelectItem
                                        key={category._id}
                                        value={category._id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    ))
                                  : ""}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subcategoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التصنيف الفرعي</FormLabel>
                          <Select
                            dir="rtl"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="إختر تصنيف فرعي" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <AddNewSubcategory
                                selectedCategoryId={selectedCategory}
                              />
                              {categories && categories.length > 0 ? (
                                <Subcategories
                                  selectedCategoryId={selectedCategory}
                                />
                              ) : (
                                ""
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            يمكنك التحكم في التصنيفات والتصنيفات الفرعية من{" "}
                            <Link href="/dashboard/products/categories">
                              إعدادات التصنيف
                            </Link>
                            .
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AddProductCard>
                  <AddProductCard title="السعر" width="w-full">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>السعر</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="مثلاً: 50"
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseFloat(e.target.value));
                                console.log(e.target.value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>سعر الخصم</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="مثلاً: 50"
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseFloat(e.target.value));
                                console.log(e.target.value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </AddProductCard>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateProductPage;
