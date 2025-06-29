"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolSchema = exports.CreateSchoolSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const slugify_1 = __importDefault(require("slugify"));
const common_1 = require("./common");
const utils_1 = require("../utils");
const data_urls_1 = __importDefault(require("data-urls"));
exports.CreateSchoolSchema = common_1.CommonSchema.pick({
    country: true,
}).extend({
    logo: common_1.CommonSchema.shape.image,
    schoolImage: common_1.CommonSchema.shape.image,
    name: zod_1.default.string().trim().nonempty("Required"),
    slug: zod_1.default
        .string()
        .trim()
        .toLowerCase()
        .nonempty("required")
        .transform((val) => (0, slugify_1.default)(val, { lower: true, strict: true })),
    state: zod_1.default.string().trim().nonempty("Required"),
    city: zod_1.default.string().trim().nonempty("Required"),
    address: zod_1.default.string().trim().nonempty("Required"),
    link: zod_1.default.string().trim().url("Enter a valid url"),
    institutionType: zod_1.default.enum([
        utils_1.institutionType.college,
        utils_1.institutionType.university,
    ]),
    ownershipType: zod_1.default.enum([utils_1.ownershipType.private, utils_1.ownershipType.public]),
    currency: zod_1.default.enum([
        utils_1.currencies.AUD,
        utils_1.currencies.CAD,
        utils_1.currencies.EUR,
        utils_1.currencies.GBP,
        utils_1.currencies.NGN,
        utils_1.currencies.USD,
    ]),
    overview: zod_1.default.string().trim().nonempty("Required"),
});
exports.UpdateSchoolSchema = exports.CreateSchoolSchema.omit({
    logo: true,
    schoolImage: true,
}).extend({
    logo: zod_1.default
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
    schoolImage: zod_1.default
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
});
