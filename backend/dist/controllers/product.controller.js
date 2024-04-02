"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToActiveController = exports.updateProductController = exports.deleteProductController = exports.getProductByIdController = exports.getInactiveProductsController = exports.getActiveProductsController = exports.getProductsController = exports.postProductController = void 0;
const sharp_1 = __importDefault(require("sharp"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = __importDefault(require("../config/s3"));
const product_service_1 = require("../services/product.service");
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const addon_model_1 = require("../models/addon.model");
// Create Product
async function postProductController(req, res) {
    try {
        const { name, description, calories, price, salePrice, categoryId, subcategoryId, addonCategory, addons, variations, } = req.body;
        let variable;
        // add Variation
        if (variations.length > 0) {
            variable = true;
        }
        else {
            variable = false;
        }
        // const parsedVariations = JSON.parse(variations);
        // add addons in array
        const addonsArr = addons ? addons.split(",") : [];
        // Get AddonCategory name
        let addonCategoryName = "";
        const addonCategoryExist = await addon_model_1.AddonCategory.findById(addonCategory);
        if (addonCategoryExist) {
            addonCategoryName = addonCategoryExist.name;
        }
        // validate img
        if (!req.file) {
            return res.status(400).send("Image is required");
        }
        // resize image
        const resizedImage = await (0, sharp_1.default)(req.file?.buffer)
            .resize({ width: 400, height: 400, fit: "contain" })
            .png({ quality: 80 })
            .toBuffer();
        // encrepted key
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const encreptedKey = timestamp + randomString;
        const imgName = encreptedKey + req.file?.originalname;
        const s3 = new client_s3_1.S3Client(s3_1.default);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME || "",
            Key: imgName,
            Body: resizedImage,
            ContentType: req.file?.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await s3.send(command);
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imgName}`;
        const product = await product_model_1.default.create({
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
            variable: false,
            variations: [],
        });
        res.status(200).send(product);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
exports.postProductController = postProductController;
// Get all products
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
async function getActiveProductsController(req, res) {
    try {
        const products = await product_model_1.default.find({ active: true });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getActiveProductsController = getActiveProductsController;
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
        // Create product image
        const img = "http://localhost:3001/content/demo.jfif";
        // Update product
        const updatedProduct = await product_model_1.default.findByIdAndUpdate(oldProductId, // The id of the product to update
        {
            ...productData,
            category: category._id,
            name,
            imgURL: img,
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
//# sourceMappingURL=product.controller.js.map