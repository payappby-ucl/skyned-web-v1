"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSchema = void 0;
const libphonenumber_js_1 = require("libphonenumber-js");
const zod_1 = __importDefault(require("zod"));
/** Common schema use in multiple places */
exports.CommonSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address")
        .nonempty("Required"),
    phoneNumber: zod_1.default
        .string()
        .trim()
        .nonempty("Enter a valid phone number")
        .superRefine((val, ctx) => {
        if (!(0, libphonenumber_js_1.isValidPhoneNumber)(val)) {
            ctx.addIssue({
                code: zod_1.default.ZodIssueCode.custom,
                message: "Enter a valid phone number",
            });
        }
    }),
});
