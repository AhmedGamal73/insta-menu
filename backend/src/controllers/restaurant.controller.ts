import { Request, Response } from "express";
import multer from "multer";
const env = require("dotenv").config();

import Restaurant from "../models/restaurant.model";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads" + "/" + "restaurants");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
export const upload = multer({ storage });

// POST Restaurant
export async function postRestaurantController(req: Request, res: Response) {
  try {
    const { title, slug, tags } = req.body;

    let bgImg = "";
    if (req.file !== undefined) {
      bgImg = req.file?.path;
    }

    // Validate Title
    const titleExist = await Restaurant.find({ title });
    if (titleExist && titleExist.length > 0) {
      return res.status(400).json({ error: "Title already exists" });
    }

    // Validate Slug
    const validSlugExist = await Restaurant.find({ slug });
    if (validSlugExist && validSlugExist.length > 0) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // tags
    const tagsArr = tags.split("،");
    const imgURL = process.env.API_BASE_URL + bgImg;

    const restaurant = new Restaurant({
      title,
      slug,
      tags: tagsArr,
      bgImg: imgURL.replace(/\\/g, "/"),
    });
    await restaurant.save();

    return res.status(201).json(restaurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Restaurants
export async function getRestaurantsController(req: Request, res: Response) {
  try {
    const items = await Restaurant.find().sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Featured Restaurants
export async function getFeaturedRestaurantsController(
  req: Request,
  res: Response
) {
  let restaurants = [];
  try {
    const featuredRestaurants = await Restaurant.find({ featured: true }).sort({
      createdAt: -1,
    });
    if (featuredRestaurants.length === 0) {
      restaurants = await Restaurant.find().sort({ createdAt: -1 }).limit(5);
    } else {
      restaurants = featuredRestaurants;
    }

    return res.status(200).json(restaurants);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Restaurant
export async function getRestaurantController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate("categories");
    return res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Restaurant by Slug
export async function getRestaurantBySlugController(
  req: Request,
  res: Response
) {
  try {
    const { slug } = req.params;
    const restaurant = await Restaurant.findOne({ slug });
    return res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// GET Restaurant Categories
export async function getRestaurantCategoriesController(
  req: Request,
  res: Response
) {
  try {
    const { slug } = req.params;
    const restaurant = await Restaurant.findOne({ slug }).populate({
      path: "categories",
      select: "_id name",
    });
    return res.status(200).json(restaurant.categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
