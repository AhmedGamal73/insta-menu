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
const table_route_1 = __importDefault(require("./routes/table.route"));
const section_route_1 = __importDefault(require("./routes/section.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const addon_route_1 = __importDefault(require("./routes/addon.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const address_route_1 = __importDefault(require("./routes/address.route"));
const qrcode_route_1 = __importDefault(require("./routes/qrcode.route"));
const customer_route_1 = __importDefault(require("./routes/customer.route"));
const addon_model_1 = require("./models/addon.model");
const { API_PORT } = process.env;
const port = process.env.API_PORT || API_PORT;
const app = (0, express_1.default)();
app.options("*", (0, cors_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/section", section_route_1.default);
app.use("/order", order_route_1.default);
app.use("/table", table_route_1.default);
app.use("/product", product_route_1.default);
app.use("/category", category_route_1.default);
app.use("/addon", addon_route_1.default);
app.use("/user", user_route_1.default);
app.use("/customer", customer_route_1.default);
app.use("/qr", qrcode_route_1.default);
app.use("/address", address_route_1.default);
app.use("/cart", cart_route_1.default);
// POST Addon
app.post("/addoncategory", async (req, res) => {
    try {
        const { name } = req.body;
        const categoryExists = await addon_model_1.AddonCategory.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const newCategory = await addon_model_1.AddonCategory.create({ name });
        res.status(201).json({ newCategory });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
});
// GET AddonCategories
app.get("/addoncategory", async (req, res) => {
    try {
        const categories = await addon_model_1.AddonCategory.find();
        res.json(categories);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
});
// PUT Addoncategory
app.put("/addoncategory/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await addon_model_1.AddonCategory.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.name = name;
        await category.save();
        return res.json(category);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
});
mongoose_1.default.connect(database_1.MONGO_URL);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map