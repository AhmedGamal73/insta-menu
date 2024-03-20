require("dotenv").config();
require("./config/database").connect();
import http, { Server } from "http";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { MONGO_URL } from "./config/database";
import cors from "cors";

import tableRouter from "./routes/table.route";
import sectionRouter from "./routes/section.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import addonsRouter from "./routes/addon.route";
import waiterRouter from "./routes/waiter";
import Img from "./models/Img.model";
import customerRouter from "./routes/customer.route";
import qrRouter from "./routes/qrcode.route";
import { AddonCategory } from "./models/addon.model";
import userRouter from "./routes/user.route";
import orderRouter from "./routes/order.route";
import cartRouter from "./routes/cart.route";
import addressRouter from "./routes/address.route";

const { API_PORT } = process.env;
const port = (process.env.API_PORT as String) || API_PORT;

const app = express();

app.options("*", cors());
app.use(cors());
app.use(express.json());

app.use("/section", sectionRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/table", tableRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/addon", addonsRouter);
app.use("/waiter", waiterRouter);
app.use("/customer", customerRouter);
app.use("/qr", qrRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);

// POST Addon
app.post("/addoncategory", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const categoryExists = await AddonCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await AddonCategory.create({ name });
    res.status(201).json({ newCategory });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

// GET AddonCategories
app.get("/addoncategory", async (req: Request, res: Response) => {
  try {
    const categories = await AddonCategory.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

// PUT Addoncategory
app.put("/addoncategory/:id", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await AddonCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    await category.save();
    return res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.use("/uploads", express.static("uploads"));

// GET Images
app.get("/imgs", (req, res) => {
  Img.find().then((images) => {
    res.status(200).json({ images });
  });
});

mongoose.connect(MONGO_URL);
const server: Server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
