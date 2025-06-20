import { z } from "zod";

const optionSchema = z.object({
  name: z.string(),
  price: z.number(),
  salePrice: z.number(),
  active: z.boolean(),
});

const ProductFormSchema = z.object({
  // name: z.string(),
  // description: z.string(),
  // price: z.number(),
  // salePrice: z.number(),
  // categoryId: z.string(),
  // subcategoryId: z.string(),
  img: z.object({
    name: z.string(),
    value: z.string(),
    type: z.string(),
    size: z.number(),
  }),
  // addons: z.array(z.string()),
  // active: z.boolean(),
  // calories: z.number(),
  // variations: z.array(variationSchema),
  // variable: z.boolean(),
  // ingredients: z.array(ingredientsSchema),
});

export default ProductFormSchema;
