import { Request, Response } from "express";
import Category from "../models/category.model";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

export const upload = multer({ storage });
// POST Category
export async function postCategoryController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    let imgURL = "";
    if (req.file !== undefined) {
      imgURL = req.file?.path;
    }

    if (!name) {
      return res.status(400).send("All input is required");
    }

    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).send("Category Already Exist");
    }

    const newCategory = new Category({ name, imgURL });
    await newCategory.save();

    return res.status(201).json({ category: newCategory });
  } catch (err) {
    console.log(err);
  }
}

// POST Subcategory
export async function postSubcategoryController(req: Request, res: Response) {
  const { categoryId } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (category.subcategories.find((sub) => sub.name === name)) {
      return res.status(400).json({ message: "Subcategory already exist" });
    }
    category.subcategories.push({ name, total: 0 });
    category.total++;
    category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "server Error" });
  }
}

// GET Categories
export async function getCategoriesController(req: Request, res: Response) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
}

// GET Subcategories
export async function getSubcategoriesController(req: Request, res: Response) {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    res.json(category.subcategories);
  } catch (err) {
    res.status(500).json({ message: "server Error" });
  }
}

// PUT Category
export async function putCategoryController(req: Request, res: Response) {
  const { categoryName } = req.params;
  const update = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { name: categoryName },
      update,
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
