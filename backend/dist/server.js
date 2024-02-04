"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("./config/database").connect();
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const table_route_1 = __importDefault(require("./routes/table.route"));
const section_route_1 = __importDefault(require("./routes/section.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const addon_route_1 = __importDefault(require("./routes/addon.route"));
const waiter_1 = __importDefault(require("./routes/waiter"));
const Img_model_1 = __importDefault(require("./models/Img.model"));
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const qrcode_route_1 = __importDefault(require("./routes/qrcode.route"));
const { API_PORT } = process.env; // Destructure the 'API_PORT' property from 'process.env' object
const port = process.env.API_PORT || API_PORT; // Declare and assign a value to the 'port' variable
const app = (0, express_1.default)();
app.options("*", (0, cors_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/section", section_route_1.default);
app.use("/table", table_route_1.default);
app.use("/product", product_route_1.default);
app.use("/category", category_route_1.default);
app.use("/addon", addon_route_1.default);
app.use("/waiter", waiter_1.default);
app.use("/customer", customer_route_1.default);
app.use("/qr", qrcode_route_1.default);
// Multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename(req, file, cb) {
        const imgSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extentions = file.mimetype.split("/")[1];
        cb(null, `${imgSuffix}.${extentions}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/imgs", upload.single("file"), (req, res) => {
    const { productId } = req.body;
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const newImg = new Img_model_1.default({
            imgName: req.file.filename,
            productId: productId,
        });
        newImg.save();
        console.log(req.file, newImg);
    }
    catch (err) {
        console.log(err);
        return res.send("Error when trying to upload image: " + err);
    }
});
app.use("/uploads", express_1.default.static("uploads"));
// GET Images
app.get("/imgs", (req, res) => {
    Img_model_1.default.find().then((images) => {
        res.status(200).json({ images });
    });
});
mongoose_1.default.connect(database_1.MONGO_URL);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map