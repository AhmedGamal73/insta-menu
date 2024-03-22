import { z } from "zod";

export const optionSchema = z
  .object({
    name: z.string().min(1, "الرجاء إدخال اسم الخيار"),
    price: z.string().transform((v) => Number(v) || 0),
    salePrice: z
      .string()
      .transform((v) => Number(v) || 0)
      .optional(),
  })
  .refine(
    (data) => data.salePrice < data.price && data.salePrice === data.salePrice,
    {
      message: "سعر الخصم يجب ان يكون اقل السعر الاصلي",
      path: ["salePrice"],
    }
  );

export const variantSchema = z.object({
  title: z.string().min(1, "الرجاء إدخال اسم الخيار"),
  options: z.array(optionSchema),
});
