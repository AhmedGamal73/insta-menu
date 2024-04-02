import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

export async function getRestaurantsController(req: Request, res: Response) {
  try {
    const items = await Restaurant.find().sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// POST Restaurant
export async function postRestaurantController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const restaurant = new Restaurant({ name });
    await restaurant.save();
    return res.status(201).json(restaurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
