import { Document } from "mongoose";

interface IDeliveryCaptin extends Document {
  name: string;
  phone: string;
  location: string;
  status: string;
  timestamp: string;
  rating: number;
}
