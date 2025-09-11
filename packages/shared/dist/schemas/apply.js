"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyFormSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
const utils_1 = require("../utils");
exports.ApplyFormSchema = common_1.CommonSchema.pick({
    email: true,
    phoneNumber: true,
    gender: true,
}).extend({
    firstName: zod_1.z.string().trim().nonempty("Required"),
    lastName: zod_1.z.string().trim().nonempty("Required"),
    programId: zod_1.z.string().trim().nonempty("Required"),
    education: zod_1.z
        .object({
        highestLevelOfEducation: zod_1.z.enum(utils_1.highestLevelOfEducation),
        value: zod_1.z.string().trim().optional(),
    })
        .superRefine((data, ctx) => {
        if (data.highestLevelOfEducation === "Others" && !data.value) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please specify you highest level of education.",
                path: ["value"],
            });
        }
    }),
    employment: zod_1.z
        .object({
        employed: zod_1.z.boolean(),
        position: zod_1.z.string().trim().optional(),
        yearsOfExperience: zod_1.z.coerce.number().positive(),
    })
        .superRefine((data, ctx) => {
        if (data.employed && !data.position) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please specify your current job and position",
                path: ["position"],
            });
        }
        if (data.employed && !data.yearsOfExperience) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please specify your years of experience",
                path: ["yearsOfExperience"],
            });
        }
    }),
});
