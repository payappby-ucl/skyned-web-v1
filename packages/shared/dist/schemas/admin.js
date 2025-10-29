"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminSchema = exports.CreateAdminSchema = void 0;
const zod_1 = require("zod");
const data_urls_1 = __importDefault(require("data-urls"));
const common_1 = require("./common");
const utils_1 = require("../utils");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
exports.CreateAdminSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().nonempty("Required"),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z.string().trim().nonempty("Required"),
    email: common_1.CommonSchema.shape.email.refine((val) => utils_1.PROHIBITED_USER_EMAIL_DOMAINS.some((emailDomain) => val.endsWith(emailDomain)), "Please use organization email."),
    gender: common_1.CommonSchema.shape.gender,
    nationality: common_1.CommonSchema.shape.country,
    countryOfResidence: common_1.CommonSchema.shape.country,
    jobTitle: zod_1.z.string().trim().nonempty("Required"),
    about: zod_1.z
        .string()
        .trim()
        .optional()
        .transform((val) => (val ? (0, sanitize_html_1.default)(val) : val)),
    phoneNumber: common_1.CommonSchema.shape.phoneNumber.optional(),
    socials: zod_1.z.array(common_1.CommonSchema.shape.social).optional(),
    primaryImage: common_1.CommonSchema.shape.image,
    secondaryImage: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
    departments: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.number().int().positive(),
        name: zod_1.z.enum([
            utils_1.department.Executive,
            utils_1.department.Admissions,
            utils_1.department.Communications,
            utils_1.department.Human_Resource,
            utils_1.department.Marketing,
            utils_1.department.Quality_Assurance,
            utils_1.department.Technical,
        ]),
    }))
        .min(1, "Please select at least one department"),
});
exports.UpdateAdminSchema = exports.CreateAdminSchema.omit({
    primaryImage: true,
    departments: true,
}).extend({
    primaryImage: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Image must be of type data-url"),
});
