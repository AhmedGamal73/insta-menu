import express from "express";
import {
  postCityController,
  getCityController,
  postDistrictController,
  getDistrictController,
  getDistrictsController,
  getAddressByIdController,
  getAddressController,
  postAddressController,
} from "../controllers/address.controller";
import isAuthenticated, { authorizeTenant } from "../middleware/auth";

const addressRouter = express.Router();

addressRouter.post("/city", postCityController);
addressRouter.get("/city", getCityController);

addressRouter.post("/district", isAuthenticated, authorizeTenant,postDistrictController);
addressRouter.get("/districts", getDistrictsController);
addressRouter.get("/district/:cityName", getDistrictController);

addressRouter.post("/", isAuthenticated, authorizeTenant,postAddressController);
addressRouter.get("/:id", getAddressByIdController);
addressRouter.get("/", getAddressController);

export default addressRouter;
