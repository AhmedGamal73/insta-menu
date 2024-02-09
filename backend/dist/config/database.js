"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.MONGO_URL = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config({ path: "../../.env" });
exports.MONGO_URL = process.env.MONGO_URL;
const connect = () => {
    const optioimportns = {};
    mongoose_1.default
        .connect(exports.MONGO_URL, optioimportns)
        .then(() => {
        console.log("Connected to database");
    })
        .catch((err) => {
        console.log("Failed to connect to database", err);
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("Database error", err);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("Database disconnected");
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("Database connected");
    });
};
exports.connect = connect;
//# sourceMappingURL=database.js.map