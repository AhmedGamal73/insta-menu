import express from "express";

import {
  postCustomerSignup,
  postCustomerLogin,
  getCustomers,
  getCustomerController,
  putCustomerFavoritesController,
  putCustomerRemoveFavoriteController,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/", getCustomers);

customerRouter.post("/signup", postCustomerSignup);

customerRouter.post("/login", postCustomerLogin);

customerRouter.get("/:customerId", getCustomerController);
customerRouter.get(
  "/:customerId/addfavorite/:productId",
  putCustomerFavoritesController
); // Add product to favorites
customerRouter.put(
  "/:customerId/deletefavorite/:productId",
  putCustomerRemoveFavoriteController
); // Remove product to favorites

export default customerRouter;
