import { z } from "zod";
import { ProgramSchema } from "./program";

export const ComputeEnglishProficiencySchema = z
  .object({
    examType: ProgramSchema.shape.englishProficiency,
    score: z.coerce
      .number()
      .positive("Must be a positive number")
      .min(1, "Minimum of 1")
      .or(
        z.object({
          reading: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          listening: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          speaking: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
          writing: z.coerce
            .number()
            .positive("Must be a positive number")
            .min(1, "Minimum of 1"),
        }),
      ),
  })
  .superRefine((arg, ctx) => {
    if (
      (["ielts", "toefl"].includes(arg.examType) &&
        typeof arg.score === "number") ||
      (["pte", "duolingo"].includes(arg.examType) &&
        typeof arg.score !== "number")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid score",
        path: ["score"],
      });
    }
  });
export type ComputeEnglishProficiencySchema = z.infer<
  typeof ComputeEnglishProficiencySchema
>;
