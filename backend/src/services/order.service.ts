import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Address, City, District } from "../models/address.model";

interface Location {
  cityName: string;
  districtId: string;
  street: string;
}

export function validateCustomerToken(customerToken: string) {
  const TOKEN_SECRET = process.env.TOKEN_SECRET_KEY || "secret";

  if (!TOKEN_SECRET) {
    throw new Error("Invalid Secret Key");
  }
  const decodedToken = jwt.verify(customerToken, TOKEN_SECRET);
  if (!decodedToken) {
    throw new Error("Invalid Token");
  }
  if (typeof decodedToken !== "string" && "_id" in decodedToken) {
    return decodedToken._id;
  }
}

export async function validateAddress(orderType: string, location: Location) {
  if (orderType === "Delivery") {
    if (!location.cityName || !location.districtId || !location.street) {
      throw new Error("Invalid Location");
    }
    const city = await City.findOne({ name: location.cityName });
    const districtId = location.districtId.toString();
    const district = await District.findById(districtId);

    if (orderType === "Delivery" && (!city || !district)) {
      throw new Error("Invalid City or District");
    }
    if (!location.districtId) {
      throw new Error("Invalid District ID");
    }

    console.log("Creating address");
    try {
      const newAddress = await Address.create({
        cityId: city?._id,
        districtId: district?._id,
        street: location.street,
      });

      await newAddress.save();
      return newAddress ? newAddress._id : null;
    } catch (error) {
      console.error("Error creating address:", error);
    }
  }
}
