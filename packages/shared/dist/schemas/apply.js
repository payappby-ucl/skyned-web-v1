"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyFormSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
const utils_1 = require("../utils");
const school_1 = require("./school");
exports.ApplyFormSchema = common_1.CommonSchema.pick({
    email: true,
    phoneNumber: true,
    gender: true,
}).extend({
    firstName: zod_1.z.string().trim().nonempty("Required"),
    lastName: zod_1.z.string().trim().nonempty("Required"),
    program: zod_1.z.object({
        slug: zod_1.z.string().nonempty("required"),
        schoolSlug: zod_1.z.string().nonempty("required"),
    }),
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
        employed: zod_1.z.enum(["Yes", "No"]),
        job: zod_1.z.string().trim().optional(),
        yearsOfExperience: zod_1.z.coerce.number().positive().optional(),
    })
        .superRefine((data, ctx) => {
        if (data.employed === "Yes" && !data.job) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please specify your current job and position",
                path: ["position"],
            });
        }
        if (data.employed === "Yes" && !data.yearsOfExperience) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please specify your years of experience",
                path: ["yearsOfExperience"],
            });
        }
    }),
    countryOfInterest: zod_1.z.array(zod_1.z.string()).min(0).optional(),
    budget: zod_1.z
        .object({
        hasBudget: zod_1.z.enum(["Yes", "No"]),
        budget: zod_1.z
            .object({
            currency: school_1.CreateSchoolSchema.shape.currency,
            amount: zod_1.z.coerce.number().min(1, "Minimum of 1"),
        })
            .optional(),
    })
        .superRefine((data, ctx) => {
        if (data.hasBudget === "Yes" && !data.budget) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Please input your budget",
                path: ["budget"],
            });
        }
    }),
});
