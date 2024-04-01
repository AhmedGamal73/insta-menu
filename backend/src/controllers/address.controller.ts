import express, { Request, Response } from "express";
import { Address, City, District } from "../models/address.model";

export async function postCityController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const city = await City.findOne({ name });
    if (city) {
      return res.status(400).json({ message: "City already exists" });
    }

    const newCity = await City.create({ name });

    return res.status(200).json(newCity);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

export async function getCityController(req: Request, res: Response) {
  try {
    const cities = await City.find();
    return res.status(200).json(cities);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

export async function postDistrictController(req: Request, res: Response) {
  try {
    const { name, price, cityId, time } = req.body;

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
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

export async function getDistrictController(req: Request, res: Response) {
  const { cityName } = req.params;
  try {
    const city = await City.findOne({ name: cityName });
    if (!city) {
      return res.status(400).json({ message: "City Not Exist" });
    }
    let districts = await District.find({ city: city._id });

    return res.status(200).json(districts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET Districts
export async function getDistrictsController(req: Request, res: Response) {
  try {
    const districts = await District.find();
    return res.status(200).json(districts);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET Address by ID
export async function getAddressByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const address = await Address.findById(id)
      .populate("cityId")
      .populate("districtId");
    return res.status(200).json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}

// GET Addresses
export async function getAddressController(req: Request, res: Response) {
  try {
    const addresses = await Address.find();
    return res.status(200).json(addresses);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}
