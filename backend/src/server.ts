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
import {resolveTenant, setAdminDb} from "./db/connectionResolver"
import tenantRouter from "./routes/tenant.route";
import adminRouter from "./routes/tenant.route";
const { API_PORT } = process.env;
const port = (process.env.API_PORT as String) || API_PORT;

const app = express();

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static("uploads"));

// db connection middleware
app.use("/tenant", resolveTenant);
app.use("/admin", setAdminDb);


app.use("/api/tenant", tenantRouter);
app.use("/api/admin", adminRouter);

app.use("/api/section", sectionRouter);
app.use("/api/order", orderRouter);
app.use("/api/table", tableRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/addon", addonRouter);
app.use("/api/user", userRouter);
app.use("/api/customer", customerRouter);
app.use("/api/qr", qrRouter);
app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/restaurant", restaurantRouter);

mongoose.connect(MONGO_URL);
const server: Server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
