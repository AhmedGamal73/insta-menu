require("dotenv").config();
require("./config/database").connect();
import http, { Server } from "http";
import mongoose from "mongoose";
import express from "express";
import { MONGO_URL } from "./config/database";
import cors from "cors";
import multer from "multer";

import tableRouter from "./routes/table.route";
import sectionRouter from "./routes/section.route";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import addonsRouter from "./routes/addon.route";
import waiterRouter from "./routes/waiter";
import Img from "./models/Img.model";
import customerRouter from "./routes/customer.route";
import qrRouter from "./routes/qrcode.route";

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
app.use("/customer", customerRouter);
app.use("/qr", qrRouter);

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    const imgSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extentions = file.mimetype.split("/")[1];
    cb(null, `${imgSuffix}.${extentions}`);
  },
});

const upload = multer({ storage: storage });

app.post("/imgs", upload.single("file"), (req, res) => {
  const { productId } = req.body;

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const newImg = new Img({
      imgName: req.file.filename,
      productId: productId,
    });
    newImg.save();
    console.log(req.file, newImg);
  } catch (err) {
    console.log(err);
    return res.send("Error when trying to upload image: " + err);
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
