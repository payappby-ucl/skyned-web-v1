"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccommodationSchema = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const zod_1 = require("zod");
exports.CreateAccommodationSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .trim()
        .nonempty("Required")
        .transform((val) => (0, sanitize_html_1.default)(val)),
});
