"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBulkProgramSchema = exports.CreateProgramSchema = exports.ProgramSchema = void 0;
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
exports.ProgramSchema = zod_1.z.object({
    name: zod_1.z.string().trim().nonempty("Required"),
    slug: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .nonempty("required")
        .transform((val) => (0, slugify_1.default)(val, { lower: true, strict: true })),
    faculty: zod_1.z.string().trim().nonempty("Required"),
    degreeType: zod_1.z.enum(utils_1.degreeTypes),
    overview: zod_1.z.string().trim().nonempty("Required"),
    description: zod_1.z.string().trim().nonempty("Required"),
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
    englishProficiency: zod_1.z.enum(["ielts", "toefl", "duolingo", "pte", "open"]),
    minimumEnglishProficiencyScore: zod_1.z.coerce.number().min(0),
    pgwp: zod_1.z.boolean().default(false),
    intakes: zod_1.z
        .array(zod_1.z.number().positive().int())
        .min(1, "Program must have at least one intake"),
});
exports.CreateProgramSchema = zod_1.z
    .object({
    type: zod_1.z.enum(["single", "bulk"]),
    data: exports.ProgramSchema.superRefine((args, ctx) => {
        if (args.englishProficiency !== "open") {
            try {
                utils_1.EnglishProficiency.getCefr(args.englishProficiency, args.minimumEnglishProficiencyScore);
            }
            catch {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: "Invalid score",
                    path: ["minimumEnglishProficiencyScore"],
                });
            }
        }
    }).or(zod_1.z
        .array(exports.ProgramSchema.superRefine((args, ctx) => {
        if (args.englishProficiency !== "open") {
            try {
                utils_1.EnglishProficiency.getCefr(args.englishProficiency, args.minimumEnglishProficiencyScore);
            }
            catch {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: "Invalid score",
                    path: ["minimumEnglishProficiencyScore"],
                });
            }
        }
    }))
        .min(1, "Must have at least one program.")),
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
        programSlug: zod_1.z.string().trim().nonempty("Required"),
        data: exports.ProgramSchema.partial(),
    })),
});
