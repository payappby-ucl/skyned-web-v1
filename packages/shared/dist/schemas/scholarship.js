"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScholarshipSchema = exports.CreateScholarshipSchema = void 0;
const zod_1 = require("zod");
const slugify_1 = __importDefault(require("slugify"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const common_1 = require("./common");
const utils_1 = require("../utils");
const data_urls_1 = __importDefault(require("data-urls"));
exports.CreateScholarshipSchema = zod_1.z.object({
    title: zod_1.z.string().trim().nonempty("Required"),
    subtitle: zod_1.z.string().trim().nonempty("Required"),
    slug: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .nonempty("required")
        .transform((val) => (0, slugify_1.default)(val, { lower: true, strict: true })),
    banner: common_1.CommonSchema.shape.image,
    overview: zod_1.z.string().nonempty("Required"),
    description: zod_1.z
        .string()
        .trim()
        .nonempty("Required")
        .transform((val) => (val ? (0, sanitize_html_1.default)(val) : val)),
    featured: zod_1.z.boolean().default(false),
    category: zod_1.z.enum(utils_1.scholarshipCategories),
    eligibilityRequirements: zod_1.z
        .array(zod_1.z.string().trim().nonempty("Required"))
        .min(1, "Please add at least one eligibility requirement"),
});
exports.UpdateScholarshipSchema = exports.CreateScholarshipSchema.omit({
    banner: true,
}).extend({
    banner: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
});
