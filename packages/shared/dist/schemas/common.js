"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSchema = void 0;
const zod_1 = __importDefault(require("zod"));
/** Common schema use in multiple places */
exports.CommonSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address")
        .nonempty("Required"),
});
