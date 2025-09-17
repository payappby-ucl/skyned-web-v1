import { z } from "zod";
import { CommonSchema } from "./common";
import { highestLevelOfEducation } from "../utils";
import { CreateSchoolSchema } from "./school";

export const ApplyFormSchema = CommonSchema.pick({
  email: true,
  phoneNumber: true,
  gender: true,
}).extend({
  firstName: z.string().trim().nonempty("Required"),
  lastName: z.string().trim().nonempty("Required"),
  program: z.object({
    slug: z.string().nonempty("required"),
    schoolSlug: z.string().nonempty("required"),
  }),
  intake: z.string().nonempty(),
  education: z
    .object({
      highestLevelOfEducation: z.enum(highestLevelOfEducation),
      value: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.highestLevelOfEducation === "Others" && !data.value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify you highest level of education.",
          path: ["value"],
        });
      }
    }),

  employment: z
    .object({
      employed: z.enum(["Yes", "No"]),
      job: z.string().trim().optional(),
      yearsOfExperience: z.coerce.number().positive().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.employed === "Yes" && !data.job) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your current job and position",
          path: ["position"],
        });
      }

      if (data.employed === "Yes" && !data.yearsOfExperience) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your years of experience",
          path: ["yearsOfExperience"],
        });
      }
    }),

  countryOfInterest: z.array(z.string()).min(0).optional(),

  budget: z
    .object({
      hasBudget: z.enum(["Yes", "No"]),
      budget: z
        .object({
          currency: CreateSchoolSchema.shape.currency,
          amount: z.coerce.number().min(1, "Minimum of 1"),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.hasBudget === "Yes" && !data.budget) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please input your budget",
          path: ["budget"],
        });
      }
    }),
});
export type ApplyFormSchema = z.infer<typeof ApplyFormSchema>;
