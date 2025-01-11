import { Request, Response } from "express";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/s3";

import { getProducts } from "../services/product.service";
import { productSchema } from "../models/product.model";
import { categorySchema } from "../models/category.model";
import { addonCategorySchema, addonSchema } from "../models/addon.model";
import { RestaurantSchema } from "../models/restaurant.model";
import mongoose from "mongoose";
import { connectModel } from "./table.controller";

// Create Product
export async function postProductController(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      calories,
      price,
      salePrice,
      categoryId,
      subcategoryId,
      restaurantId,
      addonCategory,
      addons,
      variations,
    } = req.body;
    if (!categoryId) return res.status(400).send("Category is required");
    let parsedVariations;
    let variable = false;
    if (variations !== undefined) {
      parsedVariations = JSON.parse(variations);
      variable = true;
    }

    const AddonCategory = await connectModel(
      "AddonCategory",
      addonCategorySchema
    );
    const Category = await connectModel("Category", categorySchema);
    const Restaurant = await connectModel("Restaurant", RestaurantSchema);
    const Product = await connectModel("Product", productSchema);
    // Get AddonCategory name
    let addonCategoryName = "";
    const addonCategoryExist = await AddonCategory.findById(addonCategory);
    if (addonCategoryExist) {
      addonCategoryName = addonCategoryExist.name;
    }

    // Validate Category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({error: "Category not found"});
    }
    category.total++;
    await category.save();

    // Add Category to Restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(400).send("Restaurant not found");
    }
    if (!restaurant.categories.includes(categoryId)) {
      restaurant.categories.push(categoryId);
      return await restaurant.save();
    }

    // // validate img
    if (!req.file) {
      return res.status(400).send("Image is required");
    }

    // // resize image
    const resizedImage = await sharp(req.file?.buffer)
      .resize({ width: 800, height: 800, fit: "cover" })
      .png({ quality: 80 })
      .toBuffer();

    // encrepted key
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const encreptedKey = timestamp + randomString;
    const imgName = encreptedKey + req.file?.originalname;

    // const s3 = new S3Client(config);

    // const params = {
    //   Bucket: process.env.AWS_BUCKET_NAME || "",
    //   Key: imgName,
    //   Body: resizedImage,
    //   ContentType: req.file?.mimetype,
    // };

    // const command = new PutObjectCommand(params);
    // await s3.send(command);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imgName}`;
    const imgUrlBackup =
      "https://erasmusnation-com.ams3.digitaloceanspaces.com/woocommerce-placeholder.png";

    const product = await Product.create({
      name: name,
      clickId: "123",
      restaurantId,
      price: variable ? 0 : price,
      salePrice: variable ? 0 : salePrice,
      description: description,
      category: categoryId,
      subcategoryId: subcategoryId,
      calories: calories,
      rating: 0,
      active: true,
      subcategory: subcategoryId,
      imgURL: imageUrl || imgUrlBackup,
      addonCategory: {
        id: addonCategory,
        name: addonCategoryName,
      },
      addons,
      variable: variable,
      variations: parsedVariations,
    });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

// Get Products

export async function getProductsController(req: Request, res: Response) {
  try {
    const products = await getProducts();
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

// GET Active Products
export async function getActiveProductsController(req: Request, res: Response) {
  try {
    const Product = await connectModel("Product", productSchema);
    await connectModel("Category", categorySchema);
    await connectModel("Restaurant", RestaurantSchema);
    await connectModel("AddonCategory", addonCategorySchema);
    const products = await Product.find({ active: true })
      .populate("category", "name")
      .populate({
        path: "restaurantId",
        select: "_id title",
      })
      .populate("addons")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET Offer Products
export async function getOfferProductsController(req: Request, res: Response) {
  try {
    const Product = await connectModel("Product", productSchema);
    const products = await Product.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET Inactive Products
export async function getInactiveProductsController(
  req: Request,
  res: Response
) {
  try {
    const Product = await connectModel("Product", productSchema);
    const products = await Product.find({ active: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET Product by id
export async function getProductByIdController(req: Request, res: Response) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product id");
  }
  try {
    const Product = await connectModel("Product", productSchema);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

// Delete Product
export async function deleteProductController(req: Request, res: Response) {
  try {
    const Product = await connectModel("Product", productSchema);
    const Category = await connectModel("Category", categorySchema);
    const product = await Product.findById(req.params.id);
    const category = await Category.findById(product?.category);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);

    if (category) {
      --category.total; // Decrement category total
      await category.save();
    }

    res.status(204).json({success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

// Update Product
export async function updateProductController(req: Request, res: Response) {
  try {
    const { sizes, variable, imgURL, name, categoryName, ...productData } = req.body;
    const oldProductId = req.params.productId;

    // Find old product exist
    const Product = await connectModel("Product", productSchema);
    const currentProduct = await Product.findById(oldProductId);
    if (!currentProduct) {
      return res.status(404).send("Product not found");
    }

    // Update sizes and variable checks
    if (currentProduct.variable === true && sizes?.length === 0) {
      return res.status(400).send("Product is variable");
    }
    if (sizes?.length > 0 && variable === false) {
      return res.status(400).send("Product is not variable");
    }

    // Prepare updated product data
    const updatedProductData = {
      ...currentProduct.toObject(), // Convert current product to a plain object
      ...productData, // Merge with new data
      category: currentProduct.category, // Default to existing category
      sizes: sizes ?? currentProduct.sizes, // Use existing sizes if not provided
      name: name ?? currentProduct.name, // Use existing name if not provided
      imgURL: imgURL ?? currentProduct.imgURL, // Use existing imgURL if not provided
    };

    // Find category by name if provided
    if (categoryName) {
      const Category = await connectModel("Category", categorySchema);
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(400).send("Category Entered Not Exist");
      }
      updatedProductData.category = category._id; // Update category if found
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(oldProductId, updatedProductData, {
      new: true, // Return the updated document
    });

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    return res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

// Update To Active
export async function updateToActiveController(req: Request, res: Response) {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const Product = await connectModel("Product", productSchema);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.active = active;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// GET Products by restaurant slug
export async function getProductsByRestaurantSlugController(
  req: Request,
  res: Response
) {
  try {
    const { slug } = req.params;
    const Restaurant = await connectModel("Restaurant", RestaurantSchema);
    const restaurant = await Restaurant.findOne({ slug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant Not Found" });
    }
    const Product = await connectModel("Product", productSchema);
    const products = await Product.find({ restaurantId: restaurant._id });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// GET Products by categoryId
export async function getProductsByCategoryIdController(
  req: Request,
  res: Response
) {
  try {
    const { categoryId } = req.params;
    const Category = await connectModel("Category", categorySchema);
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    const Product = await connectModel("Product", productSchema);
    await connectModel("Restaurant", RestaurantSchema);
    const activeProducts = await Product.find({
      active: true,
      category: categoryId,
    })
      .populate({
        path: "restaurantId",
        select: "_id name",
      })
      .sort({ createdAt: -1 });
    res.json(activeProducts);
  } catch (err) {
    console.log(err);
  }
}

interface Query {
  active: boolean;
  restaurantId: any;
  category?: string;
}

// GET Products by CategoryId and RestaurantId
export async function getProductsByCategoryIdAndRestaurantIdController(
  req: Request,
  res: Response
) {
  try {
    const { slug, categoryId } = req.params;
    // const category = await Category.findById(categoryId);
    // if (!category || categoryId !== "all") {
    //   return res.status(404).json({ message: "Category Not Found" });
    // }
    const Restaurant = await connectModel("Restaurant", RestaurantSchema);
    const Product = await connectModel("Product", productSchema);
    const restaurant = await Restaurant.findOne({ slug });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant Not Found" });
    }
    let query: Query = { active: true, restaurantId: restaurant._id };
    if (categoryId !== "all") {
      query = { ...query, category: categoryId };
    }
    await connectModel("Category", categorySchema);
    const activeProducts = await Product.find(query).populate({
      path: "category",
      select: "name",
    });
    return res.status(200).json(activeProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}
