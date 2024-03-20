import express from "express";
import {
  postCityController,
  getCityController,
  postDistrictController,
  getDistrictController,
  getDistrictsController,
  getAddressByIdController,
  getAddressController,
} from "../controllers/address.controller";

const addressRouter = express.Router();

addressRouter.post("/city", postCityController);
addressRouter.get("/city", getCityController);

addressRouter.post("/district", postDistrictController);
addressRouter.get("/districts", getDistrictsController);
addressRouter.get("/district/:cityName", getDistrictController);

addressRouter.get("/:id", getAddressByIdController);
addressRouter.get("/", getAddressController);

export default addressRouter;
