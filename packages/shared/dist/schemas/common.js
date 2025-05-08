"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSchema = void 0;
const country_state_city_1 = require("country-state-city");
const libphonenumber_js_1 = require("libphonenumber-js");
const data_urls_1 = __importDefault(require("data-urls"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
/** Common schema use in multiple places */
exports.CommonSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address")
        .nonempty("Required"),
    phoneNumber: zod_1.z
        .string()
        .trim()
        .nonempty("Enter a valid phone number")
        .superRefine((val, ctx) => {
        if (!(0, libphonenumber_js_1.isValidPhoneNumber)(val)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Enter a valid phone number",
            });
        }
    }),
    gender: zod_1.z.enum([utils_1.gender.Male, utils_1.gender.Female, utils_1.gender.Others]),
    country: zod_1.z
        .string()
        .trim()
        .refine((val) => !!country_state_city_1.Country.getCountryByCode(val), "Please enter a valid option"),
    social: zod_1.z.object({
        name: zod_1.z.enum([
            utils_1.socialMedia.facebook,
            utils_1.socialMedia.instagram,
            utils_1.socialMedia.linkedin,
            utils_1.socialMedia.pinterest,
            utils_1.socialMedia.tiktok,
            utils_1.socialMedia.x,
        ]),
        url: zod_1.z
            .string()
            .trim()
            .url("Enter a valid profile link")
            .nonempty("Required"),
    }),
    image: zod_1.z
        .string()
        .trim()
        .refine((val) => !!(0, data_urls_1.default)(val), "Image must be of type data-url"),
});
