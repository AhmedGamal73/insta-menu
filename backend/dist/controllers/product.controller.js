"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategoryIdAndRestaurantIdController = exports.getProductsByCategoryIdController = exports.getProductsByRestaurantSlugController = exports.updateToActiveController = exports.updateProductController = exports.deleteProductController = exports.getProductByIdController = exports.getInactiveProductsController = exports.getOfferProductsController = exports.getActiveProductsController = exports.getProductsController = void 0;
const product_service_1 = require("../services/product.service");
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
// Create Product
// export async function postProductController(req: Request, res: Response) {
//   try {
//     const {
//       name,
//       description,
//       calories,
//       price,
//       salePrice,
//       categoryId,
//       subcategoryId,
//       restaurantId,
//       addonCategory,
//       addons,
//       variations,
//     } = req.body;
//     let parsedVariations;
//     let variable = false;
//     if (variations !== "undefined") {
//       parsedVariations = JSON.parse(variations);
//       variable = true;
//     }
//     // Get AddonCategory name
//     let addonCategoryName = "";
//     const addonCategoryExist = await AddonCategory.findById(addonCategory);
//     if (addonCategoryExist) {
//       addonCategoryName = addonCategoryExist.name;
//     }
//     // Validate Category
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(400).send("Category not found");
//     }
//     category.total++;
//     await category.save();
//     // Add Category to Restaurant
//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(400).send("Restaurant not found");
//     }
//     if (!restaurant.categories.includes(categoryId)) {
//       restaurant.categories.push(categoryId);
//       return await restaurant.save();
//     }
//     // // validate img
//     if (!req.file) {
//       return res.status(400).send("Image is required");
//     }
//     // // resize image
//     const resizedImage = await sharp(req.file?.buffer)
//       .resize({ width: 800, height: 800, fit: "cover" })
//       .png({ quality: 80 })
//       .toBuffer();
//     // encrepted key
//     const timestamp = Date.now();
//     const randomString = Math.random().toString(36).substring(2, 15);
//     const encreptedKey = timestamp + randomString;
//     const imgName = encreptedKey + req.file?.originalname;
//     const s3 = new S3Client(config);
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME || "",
//       Key: imgName,
//       Body: resizedImage,
//       ContentType: req.file?.mimetype,
//     };
//     const command = new PutObjectCommand(params);
//     await s3.send(command);
//     const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imgName}`;
//     const imgUrlBackup =
//       "https://erasmusnation-com.ams3.digitaloceanspaces.com/woocommerce-placeholder.png";
//     const product = await Product.create({
//       name: name,
//       clickId: "123",
//       restaurantId,
//       price: variable ? 0 : price,
//       salePrice: variable ? 0 : salePrice,
//       description: description,
//       category: categoryId,
//       subcategoryId: subcategoryId,
//       calories: calories,
//       rating: 0,
//       active: true,
//       subcategory: subcategoryId,
//       imgURL: imageUrl || imgUrlBackup,
//       addonCategory: {
//         id: addonCategory,
//         name: addonCategoryName,
//       },
//       addons,
//       variable: variable,
//       variations: parsedVariations,
//     });
//     return res.status(200).json(product);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("Server error");
//   }
// }
// Get Products
async function getProductsController(req, res) {
    try {
        const products = await (0, product_service_1.getProducts)();
        return res.json(products);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}
exports.getProductsController = getProductsController;
// GET Active Products
async function getActiveProductsController(req, res) {
    try {
        const products = await product_model_1.default.find({ active: true })
            .populate("category", "name")
            .populate({
            path: "restaurantId",
            select: "_id title",
        })
            .populate("addons")
            .sort({ createdAt: -1 });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getActiveProductsController = getActiveProductsController;
// GET Offer Products
async function getOfferProductsController(req, res) {
    try {
        const products = await product_model_1.default.find({ active: true })
            .sort({ createdAt: -1 })
            .limit(6);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getOfferProductsController = getOfferProductsController;
async function getInactiveProductsController(req, res) {
    try {
        const products = await product_model_1.default.find({ active: false });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getInactiveProductsController = getInactiveProductsController;
// GET Product by id
async function getProductByIdController(req, res) {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid product id");
    }
    try {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        return res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}
exports.getProductByIdController = getProductByIdController;
// Delete Product
async function deleteProductController(req, res) {
    try {
        const product = await product_model_1.default.findById(req.params.id);
        const category = await category_model_1.default.findById(product?.category);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        await product_model_1.default.findByIdAndDelete(req.params.id);
        if (category) {
            --category.total; // Decrement category total
            await category.save();
        }
        res.status(204).json("Product deleted");
    }
    catch (err) {
        console.log(err);
    }
}
exports.deleteProductController = deleteProductController;
// Update Product
async function updateProductController(req, res) {
    try {
        const { sizes, variable, imgURL, name, categoryName, ...productData } = req.body;
        const oldProductId = req.params.productId;
        // Find old product exist
        const currentProduct = await product_model_1.default.findById(oldProductId);
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
        const oldCategory = await category_model_1.default.findById(currentProduct?.category);
        if (!oldCategory) {
            return res.status(404).send("Category not found");
        }
        // Find category
        const category = await category_model_1.default.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).send("Category Entered Not Exist");
        }
        // Decrement category total
        if (categoryName !== oldCategory.name && oldCategory.total > 0) {
            --oldCategory.total;
        }
        // Update product
        const updatedProduct = await product_model_1.default.findByIdAndUpdate(oldProductId, // The id of the product to update
        {
            ...productData,
            category: category._id,
            name,
            imgURL,
            sizes,
        }, {
            new: true, // Return the updated document
        });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        // Increment category total
        ++category.total;
        await category.save();
        return res.status(201).json(updatedProduct);
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateProductController = updateProductController;
// Update To Active
async function updateToActiveController(req, res) {
    const { id } = req.params;
    const { active } = req.body;
    try {
        const product = await product_model_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.active = active;
        await product.save();
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.updateToActiveController = updateToActiveController;
// GET Products by restaurant slug
async function getProductsByRestaurantSlugController(req, res) {
    try {
        const { slug } = req.params;
        const restaurant = await restaurant_model_1.default.findOne({ slug });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant Not Found" });
        }
        const products = await product_model_1.default.find({ restaurantId: restaurant._id });
        res.json(products);
    }
    catch (err) {
        console.log(err);
    }
}
exports.getProductsByRestaurantSlugController = getProductsByRestaurantSlugController;
// GET Products by categoryId
async function getProductsByCategoryIdController(req, res) {
    try {
        const { categoryId } = req.params;
        const category = await category_model_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        const activeProducts = await product_model_1.default.find({
            active: true,
            category: categoryId,
        })
            .populate({
            path: "restaurantId",
            select: "_id name",
        })
            .sort({ createdAt: -1 });
        res.json(activeProducts);
    }
    catch (err) {
        console.log(err);
    }
}
exports.getProductsByCategoryIdController = getProductsByCategoryIdController;
// GET Products by CategoryId and RestaurantId
async function getProductsByCategoryIdAndRestaurantIdController(req, res) {
    try {
        const { slug, categoryId } = req.params;
        // const category = await Category.findById(categoryId);
        // if (!category || categoryId !== "all") {
        //   return res.status(404).json({ message: "Category Not Found" });
        // }
        const restaurant = await restaurant_model_1.default.findOne({ slug });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant Not Found" });
        }
        let query = { active: true, restaurantId: restaurant._id };
        if (categoryId !== "all") {
            query = { ...query, category: categoryId };
        }
        const activeProducts = await product_model_1.default.find(query).populate({
            path: "category",
            select: "name",
        });
        return res.status(200).json(activeProducts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
}
exports.getProductsByCategoryIdAndRestaurantIdController = getProductsByCategoryIdAndRestaurantIdController;
//# sourceMappingURL=product.controller.js.map