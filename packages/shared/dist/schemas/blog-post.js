"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogPostSchema = exports.BlogPostSchema = exports.BlogSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
const utils_1 = require("../utils");
const data_urls_1 = __importDefault(require("data-urls"));
exports.BlogSchema = zod_1.z.object({
    title: zod_1.z.string().trim().nonempty("Required"),
    slug: common_1.CommonSchema.shape.slug,
    coverImage: common_1.CommonSchema.shape.image,
    excerpt: zod_1.z.string().trim().nonempty("Required"),
    content: common_1.CommonSchema.shape.html,
    featured: zod_1.z.boolean().default(false),
    status: zod_1.z.enum(utils_1.blogPostStatus),
    publishedAt: zod_1.z.coerce.number().positive().int().optional(),
    categories: zod_1.z
        .array(zod_1.z.string().trim().toLowerCase())
        .min(1, "At least on category is required"),
    tags: zod_1.z
        .array(zod_1.z.string().trim().toLowerCase())
        .min(1, "At least one tag is required."),
});
exports.BlogPostSchema = exports.BlogSchema.superRefine((args, ctx) => {
    if (args.status === "scheduled" && !args.publishedAt) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Please schedule a date for post to be published",
            path: ["publishedAt"],
        });
    }
});
exports.UpdateBlogPostSchema = exports.BlogSchema.omit({
    coverImage: true,
})
    .partial()
    .extend({
    coverImage: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
});
