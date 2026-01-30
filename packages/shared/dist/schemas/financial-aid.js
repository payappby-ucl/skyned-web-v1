"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAidSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
const utils_1 = require("../utils");
const data_urls_1 = __importDefault(require("data-urls"));
exports.FinancialAidSchema = zod_1.z
    .object({
    citizenship: common_1.CommonSchema.shape.country,
    canadianResident: zod_1.z.enum(["yes", "no"]),
    firstName: zod_1.z.string().trim().nonempty("Required"),
    lastName: zod_1.z.string().trim().nonempty("Required"),
    email: common_1.CommonSchema.shape.email.refine((val) => !val.endsWith("skynedconsults.com"), "Email not acceptable"),
    phoneNumber: common_1.CommonSchema.shape.phoneNumber,
    schoolSlug: zod_1.z.string().trim().nonempty("Required"),
    programSlug: zod_1.z.string().trim().nonempty("Required"),
    studyLevel: zod_1.z.enum(["undergraduate", "graduate"]),
    pgwp: zod_1.z.enum(["yes", "no"]),
    hasOfferLetter: zod_1.z.enum(["yes", "no"]),
    loanType: zod_1.z.enum(["tuition", "tuition + living expenses"]),
    livingExpensesCoverage: zod_1.z.enum(["yes", "no"]).optional(),
    programStarted: zod_1.z.enum(["yes", "no"]),
    gpa: zod_1.z.coerce.number().min(0, "Minimum of 0").optional(),
    nextSchoolTerm: zod_1.z.coerce.number().positive().int(),
    partner: zod_1.z.enum(utils_1.financialAids),
    proofOfAddress: common_1.CommonSchema.shape.image,
    identification: common_1.CommonSchema.shape.image,
    resume: common_1.CommonSchema.shape.image,
    transcript: common_1.CommonSchema.shape.image,
    bankStatement: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Must be of type data-url"),
    offerLetter: zod_1.z
        .string()
        .trim()
        .optional()
        .refine((val) => (val ? !!(0, data_urls_1.default)(val) : true), "Must be of type data-url"),
    immigrationDocument: common_1.CommonSchema.shape.image,
})
    .superRefine((args, ctx) => {
    if (args.loanType === "tuition" && !args.bankStatement) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Please upload your bank statement or scholarship letter",
            path: ["bankStatement"],
        });
    }
    if (args.hasOfferLetter === "yes" && !args.offerLetter) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Please upload your offer letter",
            path: ["offerLetter"],
        });
    }
});
