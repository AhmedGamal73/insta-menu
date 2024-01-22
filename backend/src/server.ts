require("dotenv").config();
require("./config/database").connect();
import http, { Server } from "http";
import mongoose from "mongoose";
import express from "express";
import { MONGO_URL } from "./config/database";
import cors from "cors";

import tableRouter from "./routes/table.route";
import qrRouter from "./routes/qrcode";
import sectionRouter from "./routes/section.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import addonsRouter from "./routes/addon";
import waiterRouter from "./routes/waiter";
import addonRouter from "./routes/addon";

const { API_PORT } = process.env; // Destructure the 'API_PORT' property from 'process.env' object
const port = (process.env.API_PORT as String) || API_PORT; // Declare and assign a value to the 'port' variable

const app = express();

app.options("*", cors());

app.use(cors());
app.use(express.json());

app.use("/section", sectionRouter);
app.use("/table", tableRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/addon", addonsRouter);
app.use("/waiter", waiterRouter);
app.use("/addon", addonRouter);

mongoose.connect(MONGO_URL);

const server: Server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
