require("dotenv").config();
require("./config/database").connect(); // database connection
import http, { Server } from "http";
import mongoose from "mongoose";
import express from "express";
import { MONGO_URL } from "./config/database";
import cors from "cors";
import usersRouter from "./routes/table";
import qrRouter from "./routes/qrcode";
import sectionRouter from "./routes/section";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";

const { API_PORT } = process.env; // Destructure the 'API_PORT' property from 'process.env' object
const port = (process.env.API_PORT as String) || API_PORT; // Declare and assign a value to the 'port' variable

const app = express();

app.options("*", cors());

app.use(cors());
app.use(express.json());
app.use("/api", usersRouter); // Use the 'usersRouter' object for all routes starting with '/api/users'
app.use("/api", qrRouter); // Use the 'usersRouter' object for all routes starting with '/api/users'
app.use("/api", sectionRouter); // Use the 'usersRouter' object for all routes starting with '/api/users'
app.use("/api", productRouter);
app.use("/api", categoryRouter);

mongoose.connect(MONGO_URL);

const server: Server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
