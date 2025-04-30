"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqSchema = void 0;
const zod_1 = require("zod");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
exports.CreateFaqSchema = zod_1.z.object({
    question: zod_1.z.coerce.string().trim().nonempty("Required"),
    answer: zod_1.z.coerce
        .string()
        .trim()
        .nonempty("Required")
        .transform((val) => (0, sanitize_html_1.default)(val)),
});
