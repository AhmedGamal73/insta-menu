import { z } from "zod";

const optionSchema = z.object({
  name: z.string(),
  price: z.number(),
  salePrice: z.number(),
  active: z.boolean(),
});

const variationSchema = z.object({
  name: z.string(),
  options: z.array(optionSchema),
});

const subcategoriesSchema = z.object({
  subcategoryName: z.string(),
});

const addonSchema = z.object({
  name: z.string(),
  price: z.number(),
});

const ingredientsSchema = z.object({
  name: z.string(),
  quantaty: z.number(),
});

const ProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number(),
  categoryId: z.string(),
  subcategoryId: z.string(),
  img: z.string(),
  // category: z.object({
  //   name: z.string(),
  //   // subcategories: z.array(subcategoriesSchema),
  // }),
  // calories: z.number(),
  // addons: z.array(addonSchema),
  // active: z.boolean(),
  // variations: z.array(variationSchema),
  // variable: z.boolean(),
  // ingredients: z.array(ingredientsSchema),
});

export default ProductFormSchema;
