require("dotenv").config();
require("./config/database").connect();
import http, { Server } from "http";
import mongoose from "mongoose";
import express from "express";
import { MONGO_URL } from "./config/database";
import cors from "cors";

import tableRouter from "./routes/table.route";
import sectionRouter from "./routes/section.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import addonRouter from "./routes/addon.route";
import userRouter from "./routes/user.route";
import orderRouter from "./routes/order.route";
import cartRouter from "./routes/cart.route";
import addressRouter from "./routes/address.route";
import qrRouter from "./routes/qrcode.route";
import customerRouter from "./routes/customer.route";
import restaurantRouter from "./routes/restaurant.route";

const { API_PORT } = process.env;
const port = (process.env.API_PORT as String) || API_PORT;

const app = express();

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/section", sectionRouter);
app.use("/order", orderRouter);
app.use("/table", tableRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/addon", addonRouter);
app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/qr", qrRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);
app.use("/restaurant", restaurantRouter);

mongoose.connect(MONGO_URL);
const server: Server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
