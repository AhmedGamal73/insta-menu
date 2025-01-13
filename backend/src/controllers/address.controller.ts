import express, { Request, Response } from "express";
import {
  citySchema,
  districtSchema,
  locationSchecma,
} from "../models/address.model";
import { connectModel } from "./table.controller";

export async function postCityController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const City = await connectModel("City", citySchema);
    const city = await City.findOne({ name });
    if (city) {
      return res.status(400).json({ message: "City already exists" });
    }

    const newCity = await City.create({ name });

    return res.status(200).json(newCity);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ sucess: false, message: err.message });
  }
}

export async function getCityController(req: Request, res: Response) {
  try {
    const City = await connectModel("City", citySchema);
    const cities = await City.find();
    return res.status(200).json(cities);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function postDistrictController(req: Request, res: Response) {
  try {
    const { name, price, cityId, time } = req.body;
    if (!cityId)
      return res.status(400).json({ message: "City Id is required" });
    if (!name) return res.status(400).json({ message: "nameis required" });
    if (!price) return res.status(400).json({ message: "price is required" });
    const City = await connectModel("City", citySchema);
    const District = await connectModel("District", districtSchema);
    const city = await City.findById(cityId);
    const district = await District.findOne({ name, cityId });

    if (!city) {
      return res.status(400).json({ message: "City Not Exist" });
    }
    if (district) {
      return res.status(400).json({ message: "District already exists" });
    }

    const newDistrict = await District.create({
      name,
      price,
      cityId,
      time,
    });

    return res.status(200).json({ newDistrict });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function getDistrictController(req: Request, res: Response) {
  const { cityName } = req.params;
  try {
    const City = await connectModel("City", citySchema);
    const District = await connectModel("District", districtSchema);
    const city = await City.findOne({ name: cityName });
    if (!city) {
      return res.status(400).json({ message: "City Not Exist" });
    }
    let districts = await District.find({ cityId: city._id });
    if (districts.length === 0) {
      return res
        .status(400)
        .json({ message: "District Not Found for this city" });
    }
    return res.status(200).json(districts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET Districts
export async function getDistrictsController(req: Request, res: Response) {
  try {
    const District = await connectModel("District", districtSchema);
    const districts = await District.find();
    return res.status(200).json(districts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET Address by ID
export async function getAddressByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const Address = await connectModel("Address", locationSchecma);
    const address = await Address.findById(id)
      .populate("cityId")
      .populate("districtId");
    return res.status(200).json(address);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

// GET Addresses
export async function getAddressController(req: Request, res: Response) {
  try {
    const Address = await connectModel("Address", locationSchecma);
    await connectModel("City", citySchema);
    await connectModel("District", districtSchema);
    const addresses = await Address.find()
      .populate({ path: "cityId", select: "name -_id" })
      .populate({ path: "districtId", select: "name price -_id" });
    return res.status(200).json(addresses);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function postAddressController(req: Request, res: Response) {
  try {
    const { street, districtId } = req.body;
    if (!street) return res.status(400).json({ message: "street required" });
    if (!districtId)
      return res.status(400).json({ message: "districtId is required" });
    const City = await connectModel("City", citySchema);
    const District = await connectModel("District", districtSchema);
    const Address = await connectModel("Address", locationSchecma);
    const district = await District.findById(districtId);
    const cityId = district.cityId;
    const city = await City.findById(cityId);
    const address = await Address.findOne({ street });

    if (!city) {
      return res.status(400).json({ message: "City Not Exist" });
    }
    if (!district) {
      return res.status(400).json({ message: "District Not Exist" });
    }
    if (address) {
      return res.status(400).json({ message: "Address already exist" });
    }

    const newDistrict = await Address.create({
      districtId,
      cityId,
      street,
    });

    return res.status(200).json({ newDistrict });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
