import express from "express";
import {
  getFeaturedRestaurantsController,
  getRestaurantBySlugController,
  getRestaurantCategoriesController,
  getRestaurantsController,
  postRestaurantController,
  upload,
} from "../controllers/restaurant.controller";
import isAuthenticated, {authorizeTenant} from "../middleware/auth";

const restaurantRouter = express.Router();

// POST
restaurantRouter.post("/", isAuthenticated, authorizeTenant, upload.single("bgImg"), postRestaurantController);

// GET
restaurantRouter.get("/", getRestaurantsController);
restaurantRouter.get("/featured", getFeaturedRestaurantsController);
restaurantRouter.get("/:slug/categories", getRestaurantCategoriesController);
restaurantRouter.get("/:slug", getRestaurantBySlugController);

export default restaurantRouter;
