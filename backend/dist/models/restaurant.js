"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const restaurantSchema = new Schema({
    restaurantName: { type: String, required: true },
    restaurantAddress: { type: String, required: true },
    restaurantPhone: { type: String, required: true },
    restaurantManager: { type: String, required: true },
}, {
    timestamps: true,
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
//# sourceMappingURL=restaurant.js.map