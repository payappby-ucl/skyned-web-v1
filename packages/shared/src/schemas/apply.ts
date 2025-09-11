import { z } from "zod";
import { CommonSchema } from "./common";
import { highestLevelOfEducation } from "../utils";

export const ApplyFormSchema = CommonSchema.pick({
  email: true,
  phoneNumber: true,
  gender: true,
}).extend({
  firstName: z.string().trim().nonempty("Required"),
  lastName: z.string().trim().nonempty("Required"),
  programId: z.string().trim().nonempty("Required"),
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
      employed: z.boolean(),
      position: z.string().trim().optional(),
      yearsOfExperience: z.coerce.number().positive(),
    })
    .superRefine((data, ctx) => {
      if (data.employed && !data.position) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your current job and position",
          path: ["position"],
        });
      }

      if (data.employed && !data.yearsOfExperience) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your years of experience",
          path: ["yearsOfExperience"],
        });
      }
    }),
});
export type ApplyFormSchema = z.infer<typeof ApplyFormSchema>;
