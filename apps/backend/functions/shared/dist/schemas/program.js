"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBulkProgramSchema = exports.CreateProgramSchema = exports.ProgramSchema = void 0;
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
exports.ProgramSchema = zod_1.z.object({
    name: zod_1.z.string().trim().nonempty("Required"),
    slug: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .nonempty("required")
        .transform((val) => (0, slugify_1.default)(val, { lower: true, strict: true })),
    faculty: zod_1.z.string().trim().optional(),
    degreeType: zod_1.z.enum(utils_1.degreeTypes),
    overview: zod_1.z.string().trim().nonempty("Required"),
    description: zod_1.z
        .string()
        .trim()
        .nonempty("Required")
        .transform((val) => (val ? (0, sanitize_html_1.default)(val) : val)),
    requirements: zod_1.z
        .string()
        .trim()
        .optional()
        .transform((val) => (val ? (0, sanitize_html_1.default)(val) : val)),
    applicationFee: zod_1.z.coerce.number().min(0, "Minimum of 0"),
    applicationFeeDiscount: zod_1.z.coerce
        .number()
        .min(0, "Minimum of 0")
        .max(100, "Maximum of 100"),
    tuitionFee: zod_1.z.coerce.number().min(0, "Minimum of 0"),
    tuitionFeeType: zod_1.z.enum(utils_1.tuitionFeeType),
    timeframe: zod_1.z.enum(utils_1.timeframe),
    duration: zod_1.z.coerce.number().min(1, "Minimum of 0"),
    minimumEducationLevel: zod_1.z.enum([
        "primary",
        "secondary",
        "undergraduate",
        "postgraduate",
    ]),
    minimumEducationDegree: zod_1.z.coerce
        .number()
        .positive("Must be positive")
        .int("Must be an integer")
        .min(1, "Minimum of 1")
        .max(21, "Maximum of 21"),
    minimumEligibilityGpa: zod_1.z.coerce
        .number()
        .min(1, "Minimum of 1")
        .max(100, "Maximum of 100"),
    proficiencies: zod_1.z.array(zod_1.z.object({
        test: zod_1.z.enum(["ielts", "toefl", "duolingo", "pte"]),
        score: zod_1.z.coerce.number().min(0),
    })),
    pgwp: zod_1.z.boolean().default(false),
    intakes: zod_1.z
        .array(zod_1.z.number().positive().int())
        .min(1, "Program must have at least one intake"),
});
exports.CreateProgramSchema = zod_1.z
    .object({
    type: zod_1.z.enum(["single", "bulk"]),
    data: zod_1.z.union([
        exports.ProgramSchema,
        zod_1.z.array(exports.ProgramSchema).min(1, "Must have at least one program."),
    ]),
})
    .superRefine(({ type, data }, ctx) => {
    if (type === "bulk" && !Array.isArray(data)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Bulk upload needs a list of data",
            path: ["data"],
        });
    }
});
exports.UpdateBulkProgramSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.object({
        programId: zod_1.z.string().trim().nonempty("Required"),
        data: exports.ProgramSchema.partial(),
    })),
});
