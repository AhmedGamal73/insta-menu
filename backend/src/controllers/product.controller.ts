import { Request, Response } from "express";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/s3";

import { getProducts, postProducts } from "../services/product.service";
import Product from "../models/product.model";
import Category from "../models/category.model";
import { AddonCategory } from "../models/addon.model";

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
      addonCategory,
      addons,
      variations,
    } = req.body;

    let variable = false;
    // add Variation
    if (variations) {
      variable = true;
    }
    const parsedVariations = JSON.parse(variations);

    // add addons in array
    const addonsArr = addons ? addons.split(",") : [];

    // Get AddonCategory name
    let addonCategoryName = "";
    const addonCategoryExist = await AddonCategory.findById(addonCategory);
    if (addonCategoryExist) {
      addonCategoryName = addonCategoryExist.name;
    }

    // validate img
    if (!req.file) {
      return res.status(400).send("Image is required");
    }

    // resize image
    const resizedImage = await sharp(req.file?.buffer)
      .resize({ width: 400, height: 400, fit: "contain" })
      .png({ quality: 80 })
      .toBuffer();

    // encrepted key
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const encreptedKey = timestamp + randomString;
    const imgName = encreptedKey + req.file?.originalname;

    const s3 = new S3Client(config);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: imgName,
      Body: resizedImage,
      ContentType: req.file?.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imgName}`;

    const product = await Product.create({
      name: name,
      price: price,
      salePrice: salePrice,
      description: description,
      category: categoryId,
      subcategoryId: subcategoryId,
      calories: calories,
      rating: 0,
      active: true,
      subcategory: subcategoryId,
      imgURL: imageUrl,
      addonCategory: {
        id: addonCategory,
        name: addonCategoryName,
      },
      addons: addonsArr,
      variable: variable,
      variations: parsedVariations,
    });

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// Get all products
export async function getProductsController(req: Request, res: Response) {
  try {
    const products = await getProducts();
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

export async function getActiveProductsController(req: Request, res: Response) {
  try {
    const products = await Product.find({ active: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getInactiveProductsController(
  req: Request,
  res: Response
) {
  try {
    const products = await Product.find({ active: false });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// GET Product by id
export async function getProductByIdController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

// Delete Product
export async function deleteProductController(req: Request, res: Response) {
  try {
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

    res.status(204).json("Product deleted");
  } catch (err) {
    console.log(err);
  }
}

// Update Product
export async function updateProductController(req: Request, res: Response) {
  try {
    const { sizes, variable, imgURL, name, categoryName, ...productData } =
      req.body;
    const oldProductId = req.params.productId;

    // Find old product exist
    const currentProduct = await Product.findById(oldProductId);
    if (!currentProduct) {
      return res.status(404).send("Product not found");
    }

    if (currentProduct.variable === true && sizes.length === 0) {
      return res.status(400).send("Product is variable");
    }

    // Validate if product is variable
    if (sizes.length > 0 && variable === false) {
      return res.status(400).send("Product is not variable");
    }

    // Find old category
    const oldCategory = await Category.findById(currentProduct?.category);
    if (!oldCategory) {
      return res.status(404).send("Category not found");
    }

    // Find category
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).send("Category Entered Not Exist");
    }

    // Decrement category total
    if (categoryName !== oldCategory.name && oldCategory.total > 0) {
      --oldCategory.total;
    }

    // Create product image
    const img = "http://localhost:3001/content/demo.jfif";

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      oldProductId, // The id of the product to update
      {
        ...productData,
        category: category._id,
        name,
        imgURL: img,
        sizes,
      },
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    // Increment category total
    ++category.total;
    await category.save();

    return res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
  }
}

// Update To Active
export async function updateToActiveController(req: Request, res: Response) {
  const { id } = req.params;
  const { active } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.active = active;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
