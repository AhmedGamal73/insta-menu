"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const imgSchema = new mongoose_1.default.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, default: Date.now
    }
});
exports.default = mongoose_1.default.model("Img", imgSchema);
//# sourceMappingURL=Img.model.js.map