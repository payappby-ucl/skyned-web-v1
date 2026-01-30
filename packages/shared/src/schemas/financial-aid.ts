import { z } from "zod";
import { CommonSchema } from "./common";
import { financialAids } from "../utils";
import parseDataURL from "data-urls";

export const FinancialAidSchema = z
  .object({
    citizenship: CommonSchema.shape.country,
    canadianResident: z.enum(["yes", "no"]),
    firstName: z.string().trim().nonempty("Required"),
    lastName: z.string().trim().nonempty("Required"),
    email: CommonSchema.shape.email.refine(
      (val) => !val.endsWith("skynedconsults.com"),
      "Email not acceptable",
    ),
    phoneNumber: CommonSchema.shape.phoneNumber,
    schoolSlug: z.string().trim().nonempty("Required"),
    programSlug: z.string().trim().nonempty("Required"),
    studyLevel: z.enum(["undergraduate", "graduate"]),
    pgwp: z.enum(["yes", "no"]),
    hasOfferLetter: z.enum(["yes", "no"]),
    loanType: z.enum(["tuition", "tuition + living expenses"]),
    livingExpensesCoverage: z.enum(["yes", "no"]).optional(),
    programStarted: z.enum(["yes", "no"]),
    gpa: z.coerce.number().min(0, "Minimum of 0").optional(),
    nextSchoolTerm: z.coerce.number().positive().int(),
    partner: z.enum(financialAids),
    proofOfAddress: CommonSchema.shape.image,
    identification: CommonSchema.shape.image,
    resume: CommonSchema.shape.image,
    transcript: CommonSchema.shape.image,
    bankStatement: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => (val ? !!parseDataURL(val) : true),
        "Must be of type data-url",
      ),
    offerLetter: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => (val ? !!parseDataURL(val) : true),
        "Must be of type data-url",
      ),
    immigrationDocument: CommonSchema.shape.image,
  })
  .superRefine((args, ctx) => {
    if (args.loanType === "tuition" && !args.bankStatement) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload your bank statement or scholarship letter",
        path: ["bankStatement"],
      });
    }

    if (args.hasOfferLetter === "yes" && !args.offerLetter) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload your offer letter",
        path: ["offerLetter"],
      });
    }
  });
export type FinancialAidSchema = z.infer<typeof FinancialAidSchema>;
