"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    clickId: { type: String, required: false },
    restaurantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Restaurant" },
    price: { type: Number, required: false, default: null },
    salePrice: { type: Number, required: false, default: null },
    description: { type: String, required: false },
    variable: { type: Boolean, required: false, default: false },
    imgURL: { type: String, required: false },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    subcategory: {
        id: { type: mongoose_1.Schema.Types.ObjectId, required: false },
        name: { type: String, required: false },
    },
    calories: { type: Number, required: false },
    ingredients: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Ingredient",
            required: false,
        },
    ],
    rating: { type: Number, default: 0, required: false },
    active: { type: Boolean, default: true, required: true },
    variations: {
        title: { type: String, required: false },
        options: [
            {
                clickId: { type: String, required: false },
                name: { type: String, required: false },
                price: { type: Number, required: false },
                salePrice: { type: Number, required: false },
            },
        ],
    },
    addonCategory: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "AddonCategory",
            requered: false,
        },
        name: {
            type: String,
            required: false,
        },
    },
    addons: [{ type: mongoose_1.Schema.Types.ObjectId, required: false }],
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.model.js.map