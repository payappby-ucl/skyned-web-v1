"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputeEnglishProficiencySchema = void 0;
const zod_1 = require("zod");
const program_1 = require("./program");
exports.ComputeEnglishProficiencySchema = zod_1.z
    .object({
    examType: program_1.ProgramSchema.shape.englishProficiency,
    score: zod_1.z.coerce
        .number()
        .positive("Must be a positive number")
        .min(1, "Minimum of 1")
        .or(zod_1.z.object({
        reading: zod_1.z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
        listening: zod_1.z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
        speaking: zod_1.z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
        writing: zod_1.z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
    })),
})
    .superRefine((arg, ctx) => {
    if ((["ielts", "toefl"].includes(arg.examType) &&
        typeof arg.score === "number") ||
        (["pte", "duolingo"].includes(arg.examType) &&
            typeof arg.score !== "number")) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Invalid score",
            path: ["score"],
        });
    }
});
